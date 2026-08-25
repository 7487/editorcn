import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { DEFAULT_ICONS } from "../icons";
import { useEditorState } from "./utils";

interface AlignSelectorResult {
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
}

const alignItems = [
  {
    label: "Left",
    icon: DEFAULT_ICONS.alignLeftIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- extension commands not in base ChainedCommands
    command: (e: Editor) => (e.chain().focus() as any).setTextAlign("left").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignLeft,
  },
  {
    label: "Center",
    icon: DEFAULT_ICONS.alignCenterIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).setTextAlign("center").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignCenter,
  },
  {
    label: "Right",
    icon: DEFAULT_ICONS.alignRightIcon,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).setTextAlign("right").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignRight,
  },
];

export function TextAlignSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const editorState = useEditorState(editor, (ed) => ({
    isAlignLeft:
      !ed.isActive({ textAlign: "center" }) &&
      !ed.isActive({ textAlign: "right" }),
    isAlignCenter: ed.isActive({ textAlign: "center" }),
    isAlignRight: ed.isActive({ textAlign: "right" }),
  }));

  const activeItem = alignItems.find((i) => i.isActive(editorState));

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="block-editor-bubble-btn"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen(!open)}
      >
        <span className="block-editor-bubble-dropdown-icon">
          {activeItem ? activeItem.icon : DEFAULT_ICONS.alignLeftIcon}
        </span>
        {DEFAULT_ICONS.dropdownArrowIcon}
      </button>
      {open && (
        <>
          <div className="block-editor-bubble-overlay" onClick={() => setOpen(false)} />
          <div
            className="block-editor-bubble-dropdown block-editor-bubble-dropdown--align"
            style={{ right: 0, left: "auto" }}
          >
            {alignItems.map((item, i) => (
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
                <span>{item.label}</span>
                {item.isActive(editorState) && (
                  <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.checkIcon}</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
