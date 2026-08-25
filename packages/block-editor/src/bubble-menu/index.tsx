import { useState, useEffect, useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { isTextSelection } from "@tiptap/core";
import { DEFAULT_ICONS } from "../icons";
import { NodeSelector } from "./node-selector";
import { TextButtons } from "./text-buttons";
import { TextAlignSelector } from "./align-selector";
import { LinkSelector } from "./link-selector";
import { LanguageSelector } from "./language-selector";
import { useEditorState } from "./utils";

interface BubbleMenuProps {
  editor: Editor | null;
}

// Dynamic import — BubbleMenuComponent type is resolved at runtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [copied, setCopied] = useState(false);
  const editorState = useEditorState(editor, (ed) => ({
    isCodeBlock: ed.isActive("codeBlock"),
  }));

  useEffect(() => {
    if (BubbleMenuComponent !== null) {
      setLoaded(true);
      return;
    }
    let active = true;
    bubbleMenuPromise.then(() => {
      if (active) setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const shouldShow = useCallback(
    ({ editor: ed, state }: { editor: Editor; state: { selection: { empty: boolean } } }) => {
      const { selection } = state;
      if (!ed.isEditable) return false;
      if (selection.empty && !ed.isActive("codeBlock")) return false;
      if (!selection.empty && !isTextSelection(selection)) return false;
      return true;
    },
    [],
  );

  if (!editor || !BubbleMenuComponent || !loaded) return null;

  const hasTextAlign = editor.extensionManager.extensions.some(
    (ext) => ext.name === "textAlign",
  );

  const isCodeBlockActive = editorState.isCodeBlock;

  return (
    <BubbleMenuComponent
      editor={editor}
      tippyOptions={{ placement: "top", offset: [0, 8], hideOnClick: false }}
      shouldShow={shouldShow}
    >
      <div className="block-editor-bubble-menu">
        {isCodeBlockActive ? (
          <>
            <NodeSelector editor={editor} />
            <div className="block-editor-bubble-separator" />
            <LanguageSelector editor={editor} />
            <div className="block-editor-bubble-separator" />
            <button
              type="button"
              className="block-editor-bubble-btn block-editor-copy-btn"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const { from, to } = editor.state.selection;
                const text = editor.state.doc.textBetween(from, to, "\n");
                navigator.clipboard.writeText(text).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }).catch(() => {});
              }}
            >
              <span className={`block-editor-copy-icon${copied ? " block-editor-copy-icon--copied" : ""}`}>
                {copied ? DEFAULT_ICONS.checkIcon : DEFAULT_ICONS.copyIcon}
              </span>
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </BubbleMenuComponent>
  );
}
