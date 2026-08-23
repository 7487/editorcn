import { EditorContent } from '@tiptap/react';
import DragHandle from '@tiptap/extension-drag-handle-react';
import { cn } from './lib/utils';
import { BlockEditorProvider, useBlockEditorContext } from './context';
import { BubbleMenu } from './bubble-menu';
import type { BlockEditorProps } from './types';

function BlockEditorContent() {
  const { editor, icons } = useBlockEditorContext();

  return (
    <div className="block-editor">
      {editor && editor.isEditable && (
        <DragHandle editor={editor}>
          {icons.dragHandleIcon}
        </DragHandle>
      )}
      {editor && editor.isEditable && <BubbleMenu editor={editor} />}
      <EditorContent editor={editor} className="block-editor-content" />
    </div>
  );
}

function BlockEditorRoot({ editor, children, className, labels, icons }: BlockEditorProps) {
  return (
    <BlockEditorProvider editor={editor} labels={labels} icons={icons}>
      <div className={cn("block-editor", className)}>
        {children ?? <BlockEditorContent />}
      </div>
    </BlockEditorProvider>
  );
}

export const BlockEditor = Object.assign(BlockEditorRoot, {
  Content: BlockEditorContent,
  BubbleMenu,
});
