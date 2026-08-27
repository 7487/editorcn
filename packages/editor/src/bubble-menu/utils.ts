import type { Editor } from "@tiptap/react";
import { useCallback, useRef, useSyncExternalStore } from "react";

const defaultEqual = <T>(a: T, b: T) => a === b;

export const shallowEqual = <T extends Record<string, unknown>>(
  a: T,
  b: T
): boolean => {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  const ak = Object.keys(a);
  const bk = Object.keys(b);
  if (ak.length !== bk.length) {
    return false;
  }
  return ak.every((k) => a[k] === b[k]);
};

export const useEditorState = <T>(
  editor: Editor | null,
  selector: (e: Editor) => T,
  isEqual: (a: T, b: T) => boolean = defaultEqual
): T => {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const isEqualRef = useRef(isEqual);
  isEqualRef.current = isEqual;

  const snapshotRef = useRef<{ value: T }>({
    value: editor ? selector(editor) : (undefined as unknown as T),
  });

  const updateSnapshot = useCallback(() => {
    if (!editor) {
      return;
    }
    const next = selectorRef.current(editor);
    if (
      snapshotRef.current &&
      isEqualRef.current(snapshotRef.current.value, next)
    ) {
      return;
    }
    snapshotRef.current = { value: next };
  }, [editor]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!editor) {
        return () => {
          // noop
        };
      }
      const update = () => {
        updateSnapshot();
        onStoreChange();
      };
      editor.on("selectionUpdate", update);
      editor.on("transaction", update);
      return () => {
        editor.off("selectionUpdate", update);
        editor.off("transaction", update);
      };
    },
    [editor, updateSnapshot]
  );

  const getSnapshot = useCallback((): T => snapshotRef.current.value, []);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
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
