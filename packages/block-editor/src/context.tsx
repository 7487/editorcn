import { createContext, useContext, type ReactNode } from 'react';
import type { Editor } from '@tiptap/core';
import type { BlockEditorContextValue, BlockEditorLabels } from './types';
import type { BlockEditorIcons } from './icons';
import { DEFAULT_ICONS } from './icons';
import { DEFAULT_BLOCK_EDITOR_LABELS } from './labels';

const BlockEditorContext = createContext<BlockEditorContextValue | null>(null);

export function useBlockEditorContext() {
  const ctx = useContext(BlockEditorContext);
  if (!ctx) throw new Error('BlockEditor components must be used within <BlockEditor>');
  return ctx;
}

export interface BlockEditorProviderProps {
  editor: Editor | null;
  children: ReactNode;
  labels?: Partial<BlockEditorLabels>;
  icons?: Partial<BlockEditorIcons>;
}

export function BlockEditorProvider({
  editor,
  children,
  labels,
  icons,
}: BlockEditorProviderProps) {
  const mergedLabels = { ...DEFAULT_BLOCK_EDITOR_LABELS, ...labels };
  const mergedIcons = { ...DEFAULT_ICONS, ...icons };

  return (
    <BlockEditorContext.Provider
      value={{
        editor,
        labels: mergedLabels,
        icons: mergedIcons,
      }}
    >
      {children}
    </BlockEditorContext.Provider>
  );
}
