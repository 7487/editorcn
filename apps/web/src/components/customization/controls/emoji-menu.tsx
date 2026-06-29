"use client";

import { Smile } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@rtecn/ui/components/dropdown-menu";
import { Button } from "@rtecn/ui/components/button";
import { useRichTextEditorContext } from "@rtecn/editor";

const EMOJIS = [
  "😀", "😂", "❤️", "🔥", "✅", "⭐",
  "👍", "🎉", "🚀", "💡", "📝", "🎨",
];

export function EmojiMenu() {
  const { editor } = useRichTextEditorContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Smile className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <div className="grid grid-cols-6 gap-1 p-1">
          {EMOJIS.map((emoji) => (
            <DropdownMenuItem
              key={emoji}
              className="justify-center text-lg"
              onClick={() => editor?.chain().focus().insertContent(emoji).run()}
            >
              {emoji}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
