"use client";

import { useEditorState } from "@tiptap/react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useRichTextEditorContext } from "@editorcn/editor";

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
    <NativeSelect
      size="sm"
      value={value}
      onChange={(e) => {
        const v = e.target.value;
        if (!v) return;
        if (v === "paragraph") {
          editor?.chain().focus().setParagraph().run();
        } else {
          const level = parseInt(v.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6;
          editor?.chain().focus().toggleHeading({ level }).run();
        }
      }}
      className="w-14"
    >
      <NativeSelectOption value="paragraph">Paragraph</NativeSelectOption>
      <NativeSelectOption value="h1">Heading 1</NativeSelectOption>
      <NativeSelectOption value="h2">Heading 2</NativeSelectOption>
      <NativeSelectOption value="h3">Heading 3</NativeSelectOption>
    </NativeSelect>
  );
}
