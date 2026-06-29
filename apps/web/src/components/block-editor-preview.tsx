"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import TableKit from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { showImagePrompt } from "@/components/image-prompt";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@rtecn/block-editor";
import type {
  SlashCommandSuggestionItem,
} from "@rtecn/block-editor";
import "@rtecn/block-editor/style.css";

const DEMO_CONTENT = `
<h1 style="text-align: center;">Block Editor</h1>
<p>A block-style editor built on <strong>Tiptap</strong> and <strong>shadcn/ui</strong>. Type <code>/</code> to open the command menu and insert blocks. Drag the handle on the left to reorder any block.</p>
<h2>Text Formatting</h2>
<p>Select any text to see the <strong>bubble menu</strong> with <em>formatting</em> options. You can also use <u>underline</u>, <s>strikethrough</s>, and <code>inline code</code>.</p>
<h2>Task List</h2>
<ul data-type="taskList">
   <li data-type="taskItem" data-checked="true">Design the component API</li>
   <li data-type="taskItem" data-checked="true">Build the slash command menu</li>
   <li data-type="taskItem" data-checked="false">Add table support</li>
   <li data-type="taskItem" data-checked="false">Write documentation</li>
</ul>
<h2>Table</h2>
<p>Use <code>/table</code> to insert a table. Resize columns by dragging the handles.</p>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bubble menu</td>
      <td>Done</td>
      <td>High</td>
    </tr>
    <tr>
      <td>Drag handles</td>
      <td>Done</td>
      <td>High</td>
    </tr>
    <tr>
      <td>Tables</td>
      <td>In progress</td>
      <td>Medium</td>
    </tr>
  </tbody>
</table>
<h2>Code Block with Syntax Highlighting</h2>
<pre><code class="language-javascript">import { BlockEditor } from "@rtecn/block-editor";
import StarterKit from "@tiptap/starter-kit";

function MyEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  return &lt;BlockEditor editor={editor} /&gt;;
}</code></pre>
<h2>Blockquote</h2>
<blockquote><p>Block-level content with drag handles for reordering. Every block can be moved, edited, or deleted independently.</p></blockquote>
<h2>Text Alignment</h2>
<p style="text-align: center;">Center-aligned text — great for headings.</p>
<p style="text-align: right;">Right-aligned text — useful for annotations.</p>
<h2>Images &amp; Links</h2>
<p>Type <code>/image</code> to insert an image by URL. Links are auto-detected and open in a new tab. Drag handles let you reorder any block — try it on this paragraph.</p>
`.trim();

const myItems: SlashCommandSuggestionItem[] = [
  ...defaultSlashCommandItems,
  {
    id: "custom",
    title: "Custom",
    description: "A custom command",
    keywords: ["custom"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("Hello!").run();
    },
  },
  {
    id: "image",
    title: "Image",
    description: "Insert an image.",
    keywords: ["image", "img", "picture", "photo"],
    command: ({ editor, range }) => {
      showImagePrompt().then((url) => {
        if (!url) return;
        (editor.chain().focus() as any)
          .deleteRange(range)
          .setImage({ src: url })
          .run();
      });
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a table.",
    keywords: ["table", "grid"],
    command: ({ editor, range }) => {
      (editor.chain().focus() as any)
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
];

const lowlight = createLowlight(common);

export function BlockEditorPreview() {

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      Placeholder.configure({ placeholder: "Type / for commands..." }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      CodeBlock,
      CodeBlockLowlight.configure({ lowlight}),
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(myItems),
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TableKit,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: DEMO_CONTENT,
  });

  return (
    <div className=" rounded-md border border-border font-inter [&_.ProseMirror]:text-[15px]">
      <BlockEditor editor={editor} className="px-2" />
    </div>
  );
}
