export const HEADING_SELECT_CODE = `import { useEditorState } from "@tiptap/react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useRichTextEditorContext } from "@editorcn/editor";

function HeadingSelect() {
  const { editor } = useRichTextEditorContext();
  const value = useEditorState({
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
      <SelectTrigger className="w-28" size="sm">
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
}`;

export const LINK_DIALOG_CODE = `import { useState, useEffect, useRef } from "react";
import { Link } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRichTextEditorContext } from "@editorcn/editor";

function InsertLinkDialog() {
  const { editor } = useRichTextEditorContext();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUrl("");
      const { from, to } = editor?.state.selection ?? {};
      if (from !== undefined && to !== undefined && from !== to) {
        const text = editor?.state.doc.textBetween(from, to) ?? "";
        if (/^https?:\/\//.test(text)) setUrl(text);
      }
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, editor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Link className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
          <DialogDescription>
            Enter the URL you want to link to.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Insert</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}`;

export const COLOR_POPOVER_CODE = `import { Highlighter } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRichTextEditorContext } from "@editorcn/editor";

const COLORS = [
  { name: "Yellow", value: "#fef08a" },
  { name: "Green", value: "#bbf7d0" },
  { name: "Blue", value: "#bfdbfe" },
  { name: "Pink", value: "#fbcfe8" },
  { name: "Orange", value: "#fed7aa" },
  { name: "Purple", value: "#e9d5ff" },
];

function HighlightColorPopover() {
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
}`;

export const EMOJI_MENU_CODE = `import { Smile } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRichTextEditorContext } from "@editorcn/editor";

const EMOJIS = [
  "😀", "😂", "❤️", "🔥", "✅", "⭐",
  "👍", "🎉", "🚀", "💡", "📝", "🎨",
];

function EmojiMenu() {
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
}`;

export const TABLE_DIALOG_CODE = `import { useState } from "react";
import { Grid3x3 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRichTextEditorContext } from "@editorcn/editor";

function InsertTableDialog() {
  const { editor } = useRichTextEditorContext();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [withHeaderRow, setWithHeaderRow] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow })
      .run();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Grid3x3 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Table</DialogTitle>
          <DialogDescription>
            Choose the number of rows and columns.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-muted-foreground">Rows</span>
              <Input
                type="number"
                min={1}
                max={10}
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                className="w-20"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-muted-foreground">Columns</span>
              <Input
                type="number"
                min={1}
                max={10}
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                className="w-20"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={withHeaderRow}
              onChange={(e) => setWithHeaderRow(e.target.checked)}
              className="h-4 w-4"
            />
            Include header row
          </label>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Insert</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}`;

export const FONT_SIZE_CODE = `import { useEditorState } from "@tiptap/react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/button-group";
import { Input } from "@/components/ui/input";
import { useRichTextEditorContext } from "@editorcn/editor";

const MIN = 1;
const MAX = 72;

function parseFontSize(fontSize: string | null | undefined): number {
  if (!fontSize) return 16;
  const match = String(fontSize).match(/^(\\d+)/);
  return match ? parseInt(match[1] ?? "0", 10) : 16;
}

function FontSizeControl() {
  const { editor } = useRichTextEditorContext();
  const fontSize =
    useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const e = ctx.editor;
        if (!e || e.isDestroyed) return null;
        return e.getAttributes("textStyle").fontSize ?? null;
      },
    }) ?? null;

  const current = parseFontSize(fontSize);

  const setSize = (value: number) => {
    const clamped = Math.min(MAX, Math.max(MIN, value));
    editor
      ?.chain()
      .focus()
      .setMark("textStyle", { fontSize: \`\${clamped}px\` })
      .run();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (Number.isNaN(raw)) return;
    setSize(raw);
  };

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon-sm"
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
        className="h-7 w-14 px-1 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => setSize(current + 1)}
        disabled={current >= MAX}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </ButtonGroup>
  );
}`;

export const FONT_FAMILY_CODE = `import { useEditorState } from "@tiptap/react";
import { Type } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useRichTextEditorContext } from "@editorcn/editor";

const FONTS = [
  { label: "Default", value: "" },
  { label: "Inter", value: "Inter" },
  { label: "Arial", value: "Arial" },
  { label: "Georgia", value: "Georgia" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Verdana", value: "Verdana" },
];

function FontFamilySelect() {
  const { editor } = useRichTextEditorContext();
  const value = useEditorState({
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
      <SelectTrigger className="w-32" size="sm">
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
}`;
