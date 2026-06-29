"use client";

import { useEditorState } from "@tiptap/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@rtecn/ui/components/select";
import { useRichTextEditorContext } from "@rtecn/editor";

export function HeadingSelect() {
  const { editor } = useRichTextEditorContext();
  const value =
    useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const e = ctx.editor;
        if (!e || e.isDestroyed) return "paragraph";
        if (e.isActive("heading", { level: 1 })) return "h1";
        if (e.isActive("heading", { level: 2 })) return "h2";
        if (e.isActive("heading", { level: 3 })) return "h3";
        return "paragraph";
      },
    }) ?? "paragraph";

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (!v) return;
        if (v === "paragraph") {
          editor?.chain().focus().setParagraph().run();
        } else {
          const level = parseInt(v.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6;
          editor?.chain().focus().toggleHeading({ level }).run();
        }
      }}
    >
      <SelectTrigger className="w-14" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="paragraph">Paragraph</SelectItem>
        <SelectItem value="h1">Heading 1</SelectItem>
        <SelectItem value="h2">Heading 2</SelectItem>
        <SelectItem value="h3">Heading 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
