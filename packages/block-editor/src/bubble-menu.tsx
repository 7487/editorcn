import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { type Editor } from "@tiptap/react";
import { isTextSelection } from "@tiptap/core";
import { DEFAULT_ICONS } from "./icons";

interface BubbleMenuProps {
  editor: Editor | null;
}

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
  icon: ReactNode;
  command: (editor: Editor) => void;
  isActive: (state: SelectorResult) => boolean;
}

const nodeItems: NodeItem[] = [
  {
    name: "Text",
    icon: DEFAULT_ICONS.slashTextIcon,
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
    command: (e) =>
      (e.chain().focus() as any).toggleHeading({ level: 1 }).run(),
    isActive: (s) => s.isHeading1,
  },
  {
    name: "Heading 2",
    icon: DEFAULT_ICONS.slashHeadingIcon,
    command: (e) =>
      (e.chain().focus() as any).toggleHeading({ level: 2 }).run(),
    isActive: (s) => s.isHeading2,
  },
  {
    name: "Heading 3",
    icon: DEFAULT_ICONS.slashHeadingIcon,
    command: (e) =>
      (e.chain().focus() as any).toggleHeading({ level: 3 }).run(),
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

function useEditorState(
  editor: Editor,
  selector: (e: Editor) => SelectorResult
): SelectorResult {
  const [state, setState] = useState<SelectorResult>(() => selector(editor));
  useEffect(() => {
    const update = () => setState(selector(editor));
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor, selector]);
  return state;
}

function NodeSelector({ editor }: { editor: Editor }) {
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
  const activeName =
    activeItems.length > 1 ? "Multiple" : (activeItems[0]?.name ?? "Text");
  const activeIcon = activeItems.length === 1 ? activeItems[0]?.icon : null;

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="block-editor-bubble-btn"
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
          <div
            className="block-editor-bubble-overlay"
            onClick={() => setOpen(false)}
          />
          <div className="block-editor-bubble-dropdown">
            {nodeItems.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`block-editor-bubble-dropdown-item${item.isActive(editorState) ? " block-editor-bubble-dropdown-item--active" : ""}`}
                onClick={() => {
                  item.command(editor);
                  setOpen(false);
                }}
              >
                <span className="block-editor-bubble-dropdown-icon">{item.icon}</span>
                <span>{item.name}</span>
                {item.isActive(editorState) && <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.checkIcon}</span>}
              </button>
            ))}
            <div className="block-editor-bubble-dropdown-divider" />
            <button
              type="button"
              className="block-editor-bubble-dropdown-item"
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

interface TextSelectorResult {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
}

function useTextEditorState(
  editor: Editor,
  selector: (e: Editor) => TextSelectorResult
): TextSelectorResult {
  const [state, setState] = useState<TextSelectorResult>(() =>
    selector(editor)
  );
  useEffect(() => {
    const update = () => setState(selector(editor));
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor, selector]);
  return state;
}

const textItems = [
  {
    icon: DEFAULT_ICONS.boldIcon,
    command: (e: Editor) => (e.chain().focus() as any).toggleBold().run(),
    isActive: (s: TextSelectorResult) => s.isBold,
  },
  {
    icon: DEFAULT_ICONS.italicIcon,
    command: (e: Editor) => (e.chain().focus() as any).toggleItalic().run(),
    isActive: (s: TextSelectorResult) => s.isItalic,
  },
  {
    icon: DEFAULT_ICONS.underlineIcon,
    command: (e: Editor) => (e.chain().focus() as any).toggleUnderline().run(),
    isActive: (s: TextSelectorResult) => s.isUnderline,
  },
  {
    icon: DEFAULT_ICONS.strikethroughIcon,
    command: (e: Editor) => (e.chain().focus() as any).toggleStrike().run(),
    isActive: (s: TextSelectorResult) => s.isStrike,
  },
  {
    icon: DEFAULT_ICONS.codeIcon,
    command: (e: Editor) => (e.chain().focus() as any).toggleCode().run(),
    isActive: (s: TextSelectorResult) => s.isCode,
  },
];

function TextButtons({ editor }: { editor: Editor }) {
  const editorState = useTextEditorState(editor, (ed) => ({
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
          onClick={() => item.command(editor)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

interface AlignSelectorResult {
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
}

function useAlignEditorState(
  editor: Editor,
  selector: (e: Editor) => AlignSelectorResult
): AlignSelectorResult {
  const [state, setState] = useState<AlignSelectorResult>(() =>
    selector(editor)
  );
  useEffect(() => {
    const update = () => setState(selector(editor));
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor, selector]);
  return state;
}

const alignItems = [
  {
    label: "Left",
    icon: DEFAULT_ICONS.alignLeftIcon,
    command: (e: Editor) =>
      (e.chain().focus() as any).setTextAlign("left").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignLeft,
  },
  {
    label: "Center",
    icon: DEFAULT_ICONS.alignCenterIcon,
    command: (e: Editor) =>
      (e.chain().focus() as any).setTextAlign("center").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignCenter,
  },
  {
    label: "Right",
    icon: DEFAULT_ICONS.alignRightIcon,
    command: (e: Editor) =>
      (e.chain().focus() as any).setTextAlign("right").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignRight,
  },
];

function TextAlignSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const editorState = useAlignEditorState(editor, (ed) => ({
    isAlignLeft:
      !ed.isActive({ textAlign: "center" } as any) &&
      !ed.isActive({ textAlign: "right" } as any),
    isAlignCenter: ed.isActive({ textAlign: "center" } as any),
    isAlignRight: ed.isActive({ textAlign: "right" } as any),
  }));

  const activeItem = alignItems.find((i) => i.isActive(editorState));

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="block-editor-bubble-btn"
        onClick={() => setOpen(!open)}
      >
        <span className="block-editor-bubble-dropdown-icon">
          {activeItem ? activeItem.icon : DEFAULT_ICONS.alignLeftIcon}
        </span>
        {DEFAULT_ICONS.dropdownArrowIcon}
      </button>
      {open && (
        <>
          <div
            className="block-editor-bubble-overlay"
            onClick={() => setOpen(false)}
          />
          <div
            className="block-editor-bubble-dropdown block-editor-bubble-dropdown--align"
            style={{ right: 0, left: "auto" }}
          >
            {alignItems.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`block-editor-bubble-dropdown-item${item.isActive(editorState) ? " block-editor-bubble-dropdown-item--active" : ""}`}
                onClick={() => {
                  item.command(editor);
                  setOpen(false);
                }}
              >
                <span className="block-editor-bubble-dropdown-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.isActive(editorState) && <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.checkIcon}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LinkSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ isLink, linkUrl }, setLinkState] = useState(() => ({
    isLink: editor.isActive("link"),
    linkUrl: editor.getAttributes("link").href || "",
  }));

  useEffect(() => {
    const update = () => {
      setLinkState({
        isLink: editor.isActive("link"),
        linkUrl: editor.getAttributes("link").href || "",
      });
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const handleSubmit = useCallback(
    (evt: React.FormEvent) => {
      evt.preventDefault();
      let url = inputRef.current?.value?.trim();
      if (!url) return;
      if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
      (editor.chain().focus() as any)
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setOpen(false);
    },
    [editor]
  );

  const handleUnlink = useCallback(() => {
    (editor.chain().focus() as any).unsetLink().run();
    setOpen(false);
  }, [editor]);

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className={`block-editor-bubble-btn${isLink ? " block-editor-bubble-btn--active" : ""}`}
        onClick={() => setOpen(!open)}
        title="Link"
      >
        {DEFAULT_ICONS.linkIcon}
      </button>
      {open && (
        <>
          <div
            className="block-editor-bubble-overlay"
            onClick={() => setOpen(false)}
          />
          <div
            className="block-editor-bubble-dropdown"
            style={{ right: 0, left: "auto", minWidth: "220px" }}
          >
            <form className="block-editor-link-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="block-editor-link-input"
                placeholder="Paste a link..."
                defaultValue={linkUrl}
                autoFocus
              />
              <div className="block-editor-link-actions">
                {isLink && (
                  <button
                    type="button"
                    className="block-editor-bubble-dropdown-item block-editor-bubble-dropdown-item--danger"
                    onClick={handleUnlink}
                    style={{ justifyContent: "center" }}
                  >
                    <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.unlinkIcon}</span>
                    <span>Remove</span>
                  </button>
                )}
                <button
                  type="submit"
                  className="block-editor-bubble-dropdown-item"
                  style={{ justifyContent: "center" }}
                >
                  <span className="block-editor-bubble-dropdown-icon">{DEFAULT_ICONS.checkIcon}</span>
                  <span>{isLink ? "Update" : "Add"}</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function copyBlock(editor: Editor) {
  const { from } = editor.state.selection;
  const $from = editor.state.doc.resolve(from);
  const start = $from.before($from.depth);
  const end = $from.after($from.depth);
  if (start < 0 || end <= start) return;
  const text = editor.state.doc.textBetween(start, end, "\n", "\n");
  navigator.clipboard.writeText(text).catch(() => {});
}

function deleteBlock(editor: Editor) {
  const { from } = editor.state.selection;
  const $from = editor.state.doc.resolve(from);
  const depth = $from.depth;
  const start = $from.before(depth);
  const end = $from.after(depth);
  if (start < 0 || end <= start) return;
  editor.chain().focus().deleteRange({ from: start, to: end }).run();
}

let BubbleMenuComponent: any = null;

const bubbleMenuPromise = (async () => {
  try {
    // @ts-ignore - @tiptap/react/menus only exists in v3
    const mod = await import("@tiptap/react/menus");
    BubbleMenuComponent = mod.BubbleMenu;
  } catch {
    try {
      const mod = await import("@tiptap/react");
      BubbleMenuComponent = mod.BubbleMenu;
    } catch {
      // No Tiptap BubbleMenu available
    }
  }
})();

export function BubbleMenu({ editor }: BubbleMenuProps) {
  const [loaded, setLoaded] = useState(BubbleMenuComponent !== null);

  useEffect(() => {
    if (BubbleMenuComponent !== null) {
      setLoaded(true);
      return;
    }
    let active = true;
    bubbleMenuPromise.then(() => {
      if (active) setLoaded(true);
    });
    return () => { active = false; };
  }, []);

  if (!editor || !BubbleMenuComponent || !loaded) return null;

  const hasTextAlign = editor.extensionManager.extensions.some(
    (ext) => (ext as any).name === "textAlign"
  );

  return (
    <BubbleMenuComponent
      editor={editor as any}
      tippyOptions={{ placement: "top", offset: [0, 8] }}
      shouldShow={({ editor: ed, state }: { editor: Editor; state: any }) => {
        const { selection } = state;
        if (!ed.isEditable) return false;
        if (selection.empty) return false;
        if (!isTextSelection(selection)) return false;
        return true;
      }}
    >
      <div className="block-editor-bubble-menu">
        <NodeSelector editor={editor} />
        <div className="block-editor-bubble-separator" />
        <TextButtons editor={editor} />
        <div className="block-editor-bubble-separator" />
        <LinkSelector editor={editor} />
        {hasTextAlign && (
          <>
            <div className="block-editor-bubble-separator" />
            <TextAlignSelector editor={editor} />
          </>
        )}
      </div>
    </BubbleMenuComponent>
  );
}
