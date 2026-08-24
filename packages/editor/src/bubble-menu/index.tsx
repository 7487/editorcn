import { useState, useEffect, useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { isTextSelection } from "@tiptap/core";
import { LanguageSelector } from "./language-selector";
import { TextButtons } from "./text-buttons";
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
    []
  );

  if (!editor || !BubbleMenuComponent || !loaded) return null;

  const isCodeBlockActive = editorState?.isCodeBlock ?? false;

  return (
    <BubbleMenuComponent
      editor={editor}
      tippyOptions={{ placement: "top", offset: [0, 8], hideOnClick: false }}
      shouldShow={shouldShow}
    >
      <div className="rte-bubble-menu">
        {isCodeBlockActive ? (
          <LanguageSelector editor={editor} />
        ) : (
          <TextButtons editor={editor} />
        )}
      </div>
    </BubbleMenuComponent>
  );
}
