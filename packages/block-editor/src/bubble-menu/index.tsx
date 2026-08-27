import { isTextSelection } from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import { useState, useEffect, useCallback } from "react";

import { DEFAULT_ICONS } from "../icons";
import { BubbleButton, BubbleSeparator } from "../ui";
import { TextAlignSelector } from "./align-selector";
import { LanguageSelector } from "./language-selector";
import { LinkSelector } from "./link-selector";
import { NodeSelector } from "./node-selector";
import { TextButtons } from "./text-buttons";
import { useEditorState } from "./utils";

export interface BubbleMenuProps {
  editor: Editor | null;
}

// Dynamic import — BubbleMenuComponent type is resolved at runtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let BubbleMenuComponent: any = null;

const bubbleMenuPromise = (async () => {
  try {
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

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  const [loaded, setLoaded] = useState(BubbleMenuComponent !== null);
  const [copied, setCopied] = useState(false);
  const editorState = useEditorState(editor, (ed) => ({
    isCodeBlock: ed.isActive("codeBlock"),
  }));

  useEffect(() => {
    let active = true;
    const check = async () => {
      await bubbleMenuPromise;
      if (active) {
        setLoaded(true);
      }
    };
    void check();
    return () => {
      active = false;
    };
  }, []);

  const shouldShow = useCallback(
    ({
      editor: ed,
      state,
    }: {
      editor: Editor;
      state: { selection: { empty: boolean } };
    }) => {
      const { selection } = state;
      if (!ed.isEditable) {
        return false;
      }
      if (selection.empty && !ed.isActive("codeBlock")) {
        return false;
      }
      if (!selection.empty && !isTextSelection(selection)) {
        return false;
      }
      return true;
    },
    []
  );

  if (!editor || !BubbleMenuComponent || !loaded) {
    return null;
  }

  const hasTextAlign = editor.extensionManager.extensions.some(
    (ext) => ext.name === "textAlign"
  );

  const isCodeBlockActive = editorState.isCodeBlock;

  return (
    <BubbleMenuComponent
      editor={editor}
      tippyOptions={{ hideOnClick: false, offset: [0, 8], placement: "top" }}
      shouldShow={shouldShow}
    >
      <div className="block-editor-bubble-menu">
        {isCodeBlockActive ? (
          <>
            <NodeSelector editor={editor} />
            <BubbleSeparator />
            <LanguageSelector editor={editor} />
            <BubbleSeparator />
            <BubbleButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={async () => {
                const { from, to } = editor.state.selection;
                const text = editor.state.doc.textBetween(from, to, "\n");
                try {
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch {
                  /* ignored */
                }
              }}
            >
              <span
                className={`block-editor-copy-icon${copied ? " block-editor-copy-icon--copied" : ""}`}
              >
                {copied ? DEFAULT_ICONS.checkIcon : DEFAULT_ICONS.copyIcon}
              </span>
            </BubbleButton>
          </>
        ) : (
          <>
            <NodeSelector editor={editor} />
            <BubbleSeparator />
            <TextButtons editor={editor} />
            <BubbleSeparator />
            <LinkSelector editor={editor} />
            {hasTextAlign && (
              <>
                <BubbleSeparator />
                <TextAlignSelector editor={editor} />
              </>
            )}
          </>
        )}
      </div>
    </BubbleMenuComponent>
  );
};
