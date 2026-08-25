import type { Editor } from "@tiptap/react";
import { useState, useEffect, useRef } from "react";

export const useEditorState = <T>(
  editor: Editor | null,
  selector: (e: Editor) => T
): T => {
  const selectorRef = useRef(selector);

  const [state, setState] = useState<T>(() =>
    editor ? selector(editor) : (undefined as unknown as T)
  );

  useEffect(() => {
    selectorRef.current = selector;
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    const update = () => setState(selectorRef.current(editor));
    update();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  return state;
};

export const CODE_BLOCK_LANGUAGES = [
  "javascript",
  "typescript",
  "html",
  "css",
  "json",
  "python",
  "rust",
  "go",
  "java",
  "c",
  "cpp",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "sql",
  "bash",
  "markdown",
  "yaml",
  "xml",
  "plaintext",
] as const;
