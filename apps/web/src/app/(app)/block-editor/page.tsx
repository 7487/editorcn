"use client";

import "@editorcn/block-editor/style.css";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@editorcn/block-editor";
import type { SlashCommandSuggestionItem } from "@editorcn/block-editor";
import type { ChainedCommands, Editor, Range } from "@tiptap/core";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

import { showImagePrompt } from "@/components/image-prompt";

type ExtendedChain = ChainedCommands & {
  deleteRange: (range: Range) => ExtendedChain;
  setImage: (options: {
    src: string;
    alt?: string;
    title?: string;
  }) => ExtendedChain;
  insertTable: (options: {
    cols: number;
    rows: number;
    withHeaderRow?: boolean;
  }) => ExtendedChain;
};

const getExtendedChain = (editor: Editor) =>
  editor.chain().focus() as unknown as ExtendedChain;

const myItems: SlashCommandSuggestionItem[] = [
  ...defaultSlashCommandItems,
  {
    command: ({ editor, range }) => {
      void (async () => {
        const url = await showImagePrompt();
        if (!url) {
          return;
        }
        getExtendedChain(editor)
          .deleteRange(range)
          .setImage({ src: url })
          .run();
      })();
    },
    description: "Insert an image.",
    id: "image",
    keywords: ["image", "img", "picture", "photo"],
    title: "Image",
  },
  {
    command: ({ editor, range }) => {
      getExtendedChain(editor)
        .deleteRange(range)
        .insertTable({ cols: 3, rows: 3, withHeaderRow: true })
        .run();
    },
    description: "Insert a table.",
    id: "table",
    keywords: ["table", "grid"],
    title: "Table",
  },
];

const content = `
<h2>Welcome to the Block Editor</h2>
<p>Hover to the left edge of any block to see the drag handle. Click it for actions, or type <code>/</code> to open the slash command menu.</p>
<blockquote><p>This is a blockquote — each block has a drag handle on the left.</p></blockquote>
<ul>
  <li>Bullet list item</li>
  <li>Another item</li>
</ul>
<ol>
  <li>Numbered item one</li>
  <li>Numbered item two</li>
</ol>
<pre><code class="language-javascript">console.log("Hello from code block!");</code></pre>
`;

export const BlockEditorPage = () => {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Type / for commands, or start writing...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(myItems),
      }),
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Block Editor Demo</h1>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <BlockEditor editor={editor} />
      </div>
    </div>
  );
};
export default BlockEditorPage;
