"use client";

import { useRichTextEditorContext } from "@editorcn/editor";
import { ButtonGroup } from "@editorcn/ui/components/button-group";
import { useEditorState } from "@tiptap/react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MIN = 1;
const MAX = 72;

const parseFontSize = (fontSize: string | null | undefined): number => {
  if (!fontSize) {
    return 16;
  }
  const match = String(fontSize).match(/^(\d+)/);
  return match ? Number.parseInt(match[1] ?? "0", 10) : 16;
};

export const FontSizeControl = () => {
  const { editor } = useRichTextEditorContext();
  const fontSize =
    useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const e = ctx.editor;
        if (!e || e.isDestroyed) {
          return null;
        }
        return e.getAttributes("textStyle").fontSize ?? null;
      },
    }) ?? null;

  const current = parseFontSize(fontSize);

  const setSize = (value: number) => {
    const clamped = Math.min(MAX, Math.max(MIN, value));
    editor
      ?.chain()
      .focus()
      .setMark("textStyle", { fontSize: `${clamped}px` })
      .run();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number.parseInt(e.target.value, 10);
    if (Number.isNaN(raw)) {
      return;
    }
    setSize(raw);
  };

  return (
    <ButtonGroup className="h-[26px]">
      <Button
        className="h-[26px]"
        variant="outline"
        size="sm"
        onClick={() => setSize(current - 1)}
        disabled={current <= MIN}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Input
        type="number"
        min={MIN}
        max={MAX}
        value={current}
        onChange={handleChange}
        className="h-[26px] w-14 px-1 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        className="h-[26px]"
        variant="outline"
        size="sm"
        onClick={() => setSize(current + 1)}
        disabled={current >= MAX}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </ButtonGroup>
  );
};
