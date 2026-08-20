"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TipTapLink from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Extension } from "@tiptap/core";
import { RichTextEditor } from "@editorcn/editor";
import { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockItem,
} from "@editorcn/ui/components/kibo-ui/code-block";
import type { BundledLanguage } from "@editorcn/ui/components/kibo-ui/code-block";
import "@editorcn/editor/style.css";

const SAMPLE = `
<h2>Try it out</h2>
<p>Select some text and use the controls in the toolbar above.</p>
`.trim();

const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
});

const extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
  Underline,
  TipTapLink.configure({ openOnClick: true }),
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Placeholder.configure({ placeholder: "Type something..." }),
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TextStyle,
  FontFamily,
  FontSize,
];

export function TemplatePreview({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions: extensions as any,
    content: SAMPLE,
  });

  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const text = editor.getText();
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    };
    update();
    editor.on("update", update);
    return () => {
      editor.off("update", update);
    };
  }, [editor]);

  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="pt-4">
        <div className="overflow-hidden rounded-md border border-border">
          <RichTextEditor editor={editor}>
            <style>{`
              .rte-content table {
                border-collapse: collapse;
                table-layout: fixed;
                width: 100%;
                margin: 0;
                overflow: hidden;
              }
              .rte-content td, .rte-content th {
                border: 1px solid var(--border);
                padding: 0.5rem 0.75rem;
                vertical-align: top;
                text-align: left;
                min-width: 80px;
                position: relative;
              }
              .rte-content th {
                background: var(--muted);
                font-weight: 600;
              }
              .rte-content .selectedCell {
                background: var(--accent);
              }
            `}</style>
            <RichTextEditor.Toolbar>{children}</RichTextEditor.Toolbar>
            <RichTextEditor.Content>
              <div className="flex justify-end border-t border-border px-4 py-1.5 text-xs text-muted-foreground">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </div>
            </RichTextEditor.Content>
          </RichTextEditor>
        </div>
      </TabsContent>
      <TabsContent value="code" className="pt-4">
        <div className="relative">
          <CodeBlock
            data={[{ language: "tsx", filename: "editor.tsx", code }]}
            defaultValue="tsx"
          >
            <CodeBlockCopyButton className="absolute top-3 right-3 z-10" />
            <CodeBlockBody>
              {(item: any) => (
                <CodeBlockItem key={item.language} value={item.language}>
                  <CodeBlockContent language={item.language as BundledLanguage}>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        </div>
      </TabsContent>
    </Tabs>
  );
}
