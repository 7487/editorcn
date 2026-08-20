"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EditorPreview } from "@/components/editor-preview";
import { BlockEditorPreview } from "@/components/block-editor-preview";
import type { RichTextEditorVariant } from "@editorcn/editor";
import { ComponentCode } from "./component-code";
import { codeToHtml } from "shiki";

type CodeFile = {
  language: string;
  filename: string;
  code: string;
};

type EditorSectionProps = {
  type: "editor" | "block-editor";
  title: string;
  badge: string;
  badgeClass?: string;
  description: string;
  codeData: CodeFile[];
  docsHref: string;
};

const VARIANTS: { label: string; value: RichTextEditorVariant }[] = [
  { label: "Default", value: "default" },
  { label: "Subtle", value: "subtle" },
  { label: "Compact", value: "compact" },
];

export function EditorSection(props: EditorSectionProps) {
  const [variant, setVariant] = useState<RichTextEditorVariant>("default");

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-lg font-medium tracking-tight text-foreground">
          {props.title}
        </h2>
        <span
          className={
            props.badgeClass ??
            "inline-flex h-5 items-center rounded-full bg-foreground px-2 text-[11px] font-medium tracking-wider text-background"
          }
        >
          {props.badge}
        </span>
      </div>
      <p className="mb-4 text-base text-muted-foreground">
        {props.description}
      </p>

      {props.type === "editor" && (
        <div className="mb-3 flex gap-1">
          {VARIANTS.map((v) => (
            <Button
              key={v.value}
              variant={variant === v.value ? "default" : "outline"}
              size="sm"
              onClick={() => setVariant(v.value)}
            >
              {v.label}
            </Button>
          ))}
        </div>
      )}

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="pt-4">
          {props.type === "editor" ? (
            <EditorPreview variant={variant} />
          ) : (
            <BlockEditorPreview />
          )}
        </TabsContent>
        <TabsContent value="code" className="pt-4">
          <CodeViewer files={props.codeData} />
        </TabsContent>
      </Tabs>
      <div className="mt-3">
        <Link href={props.docsHref}>
          <Button variant="link" className="h-auto px-0">
            View docs &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}

const CodeViewer = ({ files }: { files: CodeFile[] }) => {
  const [activeFile, setActiveFile] = useState(files[0]?.filename);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const current = files.find((f) => f.filename === activeFile) ?? files[0];

  useEffect(() => {
    if (!current) return;
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    setHighlightedCode(null);

    codeToHtml(current.code, {
      lang: current.language,
      theme: "github-dark",
    })
      .then((html) => {
        if (!cancelled) {
          setHighlightedCode(html);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render code."
          );
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [current]);

  if (!files.length) {
    return (
      <div className="flex h-full min-h-72 items-center justify-center text-sm text-muted-foreground">
        No code available.
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-140 bg-code text-code-foreground lg:min-h-0">
      {files.length > 1 ? (
        <div className="mb-2 flex gap-1 border-b border-border/40 px-1">
          {files.map((f) => (
            <button
              key={f.filename}
              onClick={() => setActiveFile(f.filename)}
              className={
                f.filename === current?.filename
                  ? "border-b-2 border-foreground px-2 py-1 text-xs font-medium text-foreground"
                  : "border-b-2 border-transparent px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              }
            >
              {f.filename}
            </button>
          ))}
        </div>
      ) : null}

      <div className="no-scrollbar min-h-0 flex-1 overflow-auto px-3">
        {isLoading ? (
          <div
            className="flex h-full min-h-72 items-center justify-center text-sm text-code-foreground/60"
            role="status"
          >
            Rendering code…
          </div>
        ) : null}
        {error ? (
          <div
            className="flex h-full min-h-72 items-center justify-center px-6 text-center text-sm text-red-400"
            role="alert"
          >
            {error}
          </div>
        ) : null}
        {current && highlightedCode && !isLoading && !error ? (
          <ComponentCode
            code={current.code}
            highlightedCode={highlightedCode}
            language={current.language}
            title={current.filename}
            className="mt-0"
            copyButtonClassName="right-4"
          />
        ) : null}
      </div>
    </div>
  );
};
