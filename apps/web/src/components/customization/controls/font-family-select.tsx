"use client";

import { useRichTextEditorContext } from "@editorcn/editor";
import { useEditorState } from "@tiptap/react";
import { Type } from "lucide-react";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const FONTS = [
  { label: "Default", value: "" },
  { label: "Inter", value: "Inter" },
  { label: "Arial", value: "Arial" },
  { label: "Georgia", value: "Georgia" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Verdana", value: "Verdana" },
];

export const FontFamilySelect = () => {
  const { editor } = useRichTextEditorContext();
  const value =
    useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const e = ctx.editor;
        if (!e || e.isDestroyed) {
          return "";
        }
        return e.getAttributes("textStyle").fontFamily ?? "";
      },
    }) ?? "";

  return (
    <div className="flex items-center gap-1">
      <Type className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <NativeSelect
        size="sm"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (!v || v === "") {
            editor?.chain().focus().unsetFontFamily().run();
          } else {
            editor?.chain().focus().setFontFamily(v).run();
          }
        }}
        className="w-24"
      >
        {FONTS.map((f) => (
          <NativeSelectOption key={f.value || "default"} value={f.value}>
            {f.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};
