import { type Editor } from "@tiptap/react";
import { DEFAULT_ICONS } from "../icons";
import { useEditorState } from "./utils";

interface TextSelectorResult {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
}

const textItems = [
  {
    icon: DEFAULT_ICONS.boldIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- extension commands not in base ChainedCommands
    command: (e: Editor) => (e.chain().focus() as any).toggleBold().run(),
    isActive: (s: TextSelectorResult) => s.isBold,
  },
  {
    icon: DEFAULT_ICONS.italicIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleItalic().run(),
    isActive: (s: TextSelectorResult) => s.isItalic,
  },
  {
    icon: DEFAULT_ICONS.underlineIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleUnderline().run(),
    isActive: (s: TextSelectorResult) => s.isUnderline,
  },
  {
    icon: DEFAULT_ICONS.strikethroughIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleStrike().run(),
    isActive: (s: TextSelectorResult) => s.isStrike,
  },
  {
    icon: DEFAULT_ICONS.codeIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleCode().run(),
    isActive: (s: TextSelectorResult) => s.isCode,
  },
];

export function TextButtons({ editor }: { editor: Editor }) {
  const editorState = useEditorState(editor, (ed) => ({
    isBold: ed.isActive("bold"),
    isItalic: ed.isActive("italic"),
    isUnderline: ed.isActive("underline"),
    isStrike: ed.isActive("strike"),
    isCode: ed.isActive("code"),
  }));

  return (
    <div className="block-editor-bubble-group">
      {textItems.map((item, i) => (
        <button
          key={i}
          type="button"
          className={`block-editor-bubble-btn${item.isActive(editorState) ? " block-editor-bubble-btn--active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => item.command(editor)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
