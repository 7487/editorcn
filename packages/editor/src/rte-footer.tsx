import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "./ui/utils";
import { useRichTextEditorContext } from "./rte-context";
import type { RichTextEditorFooterProps } from "./types";

export function Footer({
  children,
  className,
  sticky = false,
  stickyOffset = 0,
  showWordCount = false,
  wordCountClassName,
  wordCountFormatter,
}: RichTextEditorFooterProps) {
  const { editor, variant } = useRichTextEditorContext();
  const [, forceUpdate] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!editor || !showWordCount) return;

    const scheduleUpdate = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        forceUpdate((t) => t + 1);
      });
    };

    const handleTransaction = ({
      transaction,
    }: {
      transaction: { docChanged: boolean };
    }) => {
      if (transaction.docChanged) scheduleUpdate();
    };

    editor.on("transaction", handleTransaction);
    scheduleUpdate();

    return () => {
      editor.off("transaction", handleTransaction);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [editor, showWordCount]);

  const wordCount = useMemo(() => {
    if (!editor || !showWordCount) return null;

    const words = editor.storage.characterCount?.words() ?? 0;
    const characters = editor.storage.characterCount?.characters() ?? 0;

    return wordCountFormatter
      ? wordCountFormatter({ words, characters })
      : `${words} words | ${characters} characters`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    editor,
    showWordCount,
    wordCountFormatter,
    editor?.state.doc.content.size,
  ]);

  if (!showWordCount && !children) return null;

  return (
    <div
      className={cn(
        "rte-footer",
        variant !== "default" && `rte-footer--${variant}`,
        sticky && "sticky z-10",
        className
      )}
      data-sticky={sticky ? "" : undefined}
      style={sticky ? { bottom: stickyOffset } : undefined}
    >
      {showWordCount && wordCount && (
        <span className={cn("rte-footer-word-count", wordCountClassName)}>
          {wordCount}
        </span>
      )}
      {children}
    </div>
  );
}
