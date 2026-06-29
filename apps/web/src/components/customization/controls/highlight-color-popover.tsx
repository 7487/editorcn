"use client";

import { Highlighter } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@rtecn/ui/components/popover";
import { Button } from "@rtecn/ui/components/button";
import { useRichTextEditorContext } from "@rtecn/editor";

const COLORS = [
  { name: "Yellow", value: "#fef08a" },
  { name: "Green", value: "#bbf7d0" },
  { name: "Blue", value: "#bfdbfe" },
  { name: "Pink", value: "#fbcfe8" },
  { name: "Orange", value: "#fed7aa" },
  { name: "Purple", value: "#e9d5ff" },
];

export function HighlightColorPopover() {
  const { editor } = useRichTextEditorContext();
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Highlighter className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-48">
        <div className="grid grid-cols-6 gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              className="h-6 w-6 rounded-sm border border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: c.value }}
              title={c.name}
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .toggleHighlight({ color: c.value })
                  .run()
              }
            />
          ))}
        </div>
        <Button
          variant="secondary"
          size="xs"
          className="mt-2 w-full"
          onClick={() => editor?.chain().focus().unsetHighlight().run()}
        >
          Remove highlight
        </Button>
      </PopoverContent>
    </Popover>
  );
}
