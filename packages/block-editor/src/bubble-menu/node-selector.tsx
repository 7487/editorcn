import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { DEFAULT_ICONS } from "../icons";
import { useEditorState, copyBlock, deleteBlock } from "./utils";

interface SelectorResult {
  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isTaskList: boolean;
  isBlockquote: boolean;
  isCodeBlock: boolean;
}

interface NodeItem {
  name: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  isActive: (state: SelectorResult) => boolean;
}

const nodeItems: NodeItem[] = [
  {
    name: "Text",
    icon: DEFAULT_ICONS.slashTextIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- extension commands not in base ChainedCommands
    command: (e) => (e.chain().focus() as any).setParagraph().run(),
    isActive: (s) =>
      s.isParagraph &&
      !s.isBulletList &&
      !s.isOrderedList &&
      !s.isTaskList &&
      !s.isBlockquote &&
      !s.isCodeBlock,
  },
  {
    name: "Heading 1",
    icon: DEFAULT_ICONS.slashHeadingIcon,
    command: (e) => (e.chain().focus() as any).toggleHeading({ level: 1 }).run(),
    isActive: (s) => s.isHeading1,
  },
  {
    name: "Heading 2",
    icon: DEFAULT_ICONS.slashHeadingIcon,
    command: (e) => (e.chain().focus() as any).toggleHeading({ level: 2 }).run(),
    isActive: (s) => s.isHeading2,
  },
  {
    name: "Heading 3",
    icon: DEFAULT_ICONS.slashHeadingIcon,
    command: (e) => (e.chain().focus() as any).toggleHeading({ level: 3 }).run(),
    isActive: (s) => s.isHeading3,
  },
  {
    name: "Bullet List",
    icon: DEFAULT_ICONS.slashBulletListIcon,
    command: (e) => (e.chain().focus() as any).toggleBulletList().run(),
    isActive: (s) => s.isBulletList,
  },
  {
    name: "Numbered List",
    icon: DEFAULT_ICONS.slashOrderedListIcon,
    command: (e) => (e.chain().focus() as any).toggleOrderedList().run(),
    isActive: (s) => s.isOrderedList,
  },
  {
    name: "To-do List",
    icon: DEFAULT_ICONS.slashTaskListIcon,
    command: (e) => (e.chain().focus() as any).toggleTaskList().run(),
    isActive: (s) => s.isTaskList,
  },
  {
    name: "Quote",
    icon: DEFAULT_ICONS.slashBlockquoteIcon,
    command: (e) => (e.chain().focus() as any).toggleBlockquote().run(),
    isActive: (s) => s.isBlockquote,
  },
  {
    name: "Code Block",
    icon: DEFAULT_ICONS.slashCodeBlockIcon,
    command: (e) => (e.chain().focus() as any).toggleCodeBlock().run(),
    isActive: (s) => s.isCodeBlock,
  },
];

export function NodeSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const editorState = useEditorState(editor, (ed) => ({
    isParagraph: ed.isActive("paragraph"),
    isHeading1: ed.isActive("heading", { level: 1 }),
    isHeading2: ed.isActive("heading", { level: 2 }),
    isHeading3: ed.isActive("heading", { level: 3 }),
    isBulletList: ed.isActive("bulletList"),
    isOrderedList: ed.isActive("orderedList"),
    isTaskList: ed.isActive("taskList"),
    isBlockquote: ed.isActive("blockquote"),
    isCodeBlock: ed.isActive("codeBlock"),
  }));

  const activeItems = nodeItems.filter((i) => i.isActive(editorState));
  const activeName = activeItems.length > 1 ? "Multiple" : (activeItems[0]?.name ?? "Text");
  const activeIcon = activeItems.length === 1 ? activeItems[0]?.icon : null;

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="block-editor-bubble-btn"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen(!open)}
      >
        {activeIcon && (
          <span className="block-editor-bubble-dropdown-icon">{activeIcon}</span>
        )}
        <span className="block-editor-bubble-btn-text">{activeName}</span>
        {DEFAULT_ICONS.dropdownArrowIcon}
      </button>
      {open && (
        <>
          <div className="block-editor-bubble-overlay" onClick={() => setOpen(false)} />
          <div className="block-editor-bubble-dropdown">
            {nodeItems.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`block-editor-bubble-dropdown-item${item.isActive(editorState) ? " block-editor-bubble-dropdown-item--active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  item.command(editor);
                  setOpen(false);
                }}
              >
                <span className="block-editor-bubble-dropdown-icon">{item.icon}</span>
                <span>{item.name}</span>
                {item.isActive(editorState) && (
                  <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.checkIcon}</span>
                )}
              </button>
            ))}
            <div className="block-editor-bubble-dropdown-divider" />
            <button
              type="button"
              className="block-editor-bubble-dropdown-item"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                copyBlock(editor);
                setOpen(false);
              }}
            >
              <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.copyIcon}</span>
              <span>Copy</span>
            </button>
            <button
              type="button"
              className="block-editor-bubble-dropdown-item block-editor-bubble-dropdown-item--danger"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                deleteBlock(editor);
                setOpen(false);
              }}
            >
              <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.deleteIcon}</span>
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
