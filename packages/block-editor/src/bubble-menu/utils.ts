import { useState, useEffect, useRef } from "react";
import { type Editor } from "@tiptap/react";

export function useEditorState<T>(
  editor: Editor | null,
  selector: (e: Editor) => T,
): T {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const [state, setState] = useState<T>(() =>
    editor ? selector(editor) : (undefined as unknown as T),
  );

  useEffect(() => {
    if (!editor) return;
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
}

export function copyBlock(editor: Editor) {
  const { from } = editor.state.selection;
  const $from = editor.state.doc.resolve(from);
  const start = $from.before($from.depth);
  const end = $from.after($from.depth);
  if (start < 0 || end <= start) return;
  const text = editor.state.doc.textBetween(start, end, "\n", "\n");
  navigator.clipboard.writeText(text).catch(() => {});
}

export function deleteBlock(editor: Editor) {
  const { from } = editor.state.selection;
  const $from = editor.state.doc.resolve(from);
  const depth = $from.depth;
  const start = $from.before(depth);
  const end = $from.after(depth);
  if (start < 0 || end <= start) return;
  editor.chain().focus().deleteRange({ from: start, to: end }).run();
}

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
