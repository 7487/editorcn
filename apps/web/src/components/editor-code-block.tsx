"use client";

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockItem,
} from "@editorcn/ui/components/kibo-ui/code-block";
import type { BundledLanguage } from "@editorcn/ui/components/kibo-ui/code-block";

interface CodeBlockData {
  language: string;
  filename: string;
  code: string;
}

export const EditorCodeBlock = ({ data }: { data: CodeBlockData[] }) => (
  <div className="relative">
    <CodeBlock data={data} defaultValue={data[0].language}>
      <CodeBlockCopyButton className="absolute top-3 right-3 z-10" />
      <CodeBlockBody>
        {(item) => (
          <CodeBlockItem key={item.language} value={item.language}>
            <CodeBlockContent language={item.language as BundledLanguage}>
              {item.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  </div>
);
