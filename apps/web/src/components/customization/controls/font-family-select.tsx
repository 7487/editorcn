"use client";

import { useEditorState } from "@tiptap/react";
import { Type } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@rtecn/ui/components/select";
import { useRichTextEditorContext } from "@rtecn/editor";

const FONTS = [
  { label: "Default", value: "" },
  { label: "Inter", value: "Inter" },
  { label: "Arial", value: "Arial" },
  { label: "Georgia", value: "Georgia" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Verdana", value: "Verdana" },
];

export function FontFamilySelect() {
  const { editor } = useRichTextEditorContext();
  const value =
    useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const e = ctx.editor;
        if (!e || e.isDestroyed) return "";
        return e.getAttributes("textStyle").fontFamily ?? "";
      },
    }) ?? "";

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (!v || v === "") {
          editor?.chain().focus().unsetFontFamily().run();
        } else {
          editor?.chain().focus().setFontFamily(v).run();
        }
      }}
    >
      <SelectTrigger className="w-24" size="sm">
        <Type className="h-3.5 w-3.5 shrink-0" />
        <SelectValue placeholder="Font" />
      </SelectTrigger>
      <SelectContent>
        {FONTS.map((f) => (
          <SelectItem key={f.value || "default"} value={f.value}>
            {f.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
