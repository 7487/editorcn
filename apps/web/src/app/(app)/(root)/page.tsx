import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommandBox } from "@/components/command-box";
import { EditorSection } from "@/components/editor-section";
import {
  IconsPreview,
  ThemePreview,
  ControlsPreview,
  ThemeCard,
} from "@/components/landing-previews";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { ROUTES } from "@/constants/routes";
import { HomeCtas } from "@/components/home-ctas";
import { PageHero } from "@/components/page-hero";

const editorCode = `import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { RichTextEditor, Link, YouTubeEmbed, TwitterEmbed } from "@editorcn/editor";
import "@editorcn/editor/style.css";

export function MyEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Link,
      YouTubeEmbed,
      TwitterEmbed,
      Underline,
      Highlight,
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start typing..." }),
    ],
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Code />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
          <RichTextEditor.H5 />
          <RichTextEditor.H6 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignRight />
          <RichTextEditor.AlignJustify />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Highlight />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.YouTubeEmbed />
          <RichTextEditor.TwitterEmbed />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}`;

const blockEditorCode = `import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import { showImagePrompt } from "@/components/image-prompt";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@editorcn/block-editor";
import type { SlashCommandSuggestionItem } from "@editorcn/block-editor";
import "@editorcn/block-editor/style.css";

const DEMO_CONTENT = "<h2>Getting Started</h2><p>The BlockEditor is a block-style editor.</p>";

const myItems: SlashCommandSuggestionItem[] = [
  ...defaultSlashCommandItems,
  {
    id: "image",
    title: "Image",
    description: "Insert an image.",
    keywords: ["image", "img", "picture", "photo"],
    command: ({ editor, range }) => {
      showImagePrompt().then((url) => {
        if (!url) return;
        editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
      });
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a table.",
    keywords: ["table", "grid"],
    command: ({ editor, range }) => {
      editor
        .chain().focus()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
];

export function MyBlockEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Placeholder.configure({ placeholder: "Type / for commands..." }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      SlashCommand.configure({ suggestion: getSlashCommandSuggestion(myItems) }),
      Link.configure({ openOnClick: true, autolink: true, defaultProtocol: "https", protocols: ["http", "https"] }),
    ],
    content: DEMO_CONTENT,
  });

  return <BlockEditor editor={editor} />;
}`;

const editorCodeData = [
  {
    language: "tsx",
    filename: "editor.tsx",
    code: editorCode,
  },
];

const blockEditorCodeData = [
  {
    language: "tsx",
    filename: "block-editor.tsx",
    code: blockEditorCode,
  },
];

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
      <PageTransition>
        <section className="container-wrapper relative">
          <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
            <PageHero
              description={
                <>
                  Two editors. One design system.
                  <br className="hidden sm:block" />
                  Built on Tiptap with shadcn/ui tokens.
                </>
              }
              descriptionClassName="max-w-2xl text-lg sm:text-xl"
              title="Rich Text Editors for Shadcn ui."
              titleClassName="max-w-7xl"
            />

            <CommandBox className="mt-4 w-full max-w-xl" />

            <HomeCtas />
          </div>
        </section>

        <section className="container-wrapper pb-8 lg:pb-12">
          <div className="container space-y-12">
            <EditorSection
              type="editor"
              title="Rich Text Editor"
              badge="Toolbar"
              description="A traditional toolbar-style rich text editor. 20+ built-in controls including text formatting, headings, lists, links, alignment, and history."
              codeData={editorCodeData}
              docsHref="/docs/editor"
            />

            <EditorSection
              type="block-editor"
              title="Block Editor"
              badge="Blocks"
              badgeClass="inline-flex h-5 items-center rounded-full bg-primary px-2 text-[11px] font-medium tracking-wider text-primary-foreground"
              description="A Notion-style block-based editor with slash commands, drag handles, and a bubble menu. Supports images, tables, code blocks, and task lists."
              codeData={blockEditorCodeData}
              docsHref="/docs/block-editor"
            />
          </div>
        </section>

        <section className="border-t border-border">
          <div className="container-wrapper">
            <div className="container space-y-12 py-24">
              <div>
                <h2 className="mb-2 text-lg font-medium tracking-tight text-foreground">
                  Customize everything
                </h2>
                <p className="text-base text-muted-foreground">
                  Icons, colors, controls — every part of the editor is yours to
                  shape.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-3 rounded-lg p-4">
                  <span className="inline-flex h-5 items-center rounded-full bg-foreground px-2 text-[11px] font-medium tracking-wider text-background">
                    Icons
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Swap any icon via the icons prop.
                  </p>
                  <div className="-mx-4 -mb-4">
                    <IconsPreview />
                  </div>
                </div>
                <ThemeCard className="space-y-3 rounded-lg p-4">
                  <span className="inline-flex h-5 items-center rounded-full bg-primary px-2 text-[11px] font-medium tracking-wider text-primary-foreground">
                    Themes
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Override CSS variables for a completely different look.
                  </p>
                  <div className="-mx-4 -mb-4">
                    <ThemePreview />
                  </div>
                </ThemeCard>
                <div className="space-y-3 rounded-lg p-4">
                  <span className="inline-flex h-5 items-center rounded-full bg-foreground px-2 text-[11px] font-medium tracking-wider text-background">
                    Controls
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Add custom toolbar buttons using RichTextEditor.Control.
                  </p>
                  <div className="-mx-4 -mb-4">
                    <ControlsPreview />
                  </div>
                </div>
              </div>
              <div>
                <Link href="/docs/customization">
                  <Button variant="link" className="h-auto px-0">
                    Explore customization &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
