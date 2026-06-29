"use client";

import { RichTextEditor } from "@rtecn/editor";
import { TemplatePreview } from "./template-preview";
import { HeadingSelect } from "./controls/heading-select";
import { InsertLinkDialog } from "./controls/insert-link-dialog";
import { HighlightColorPopover } from "./controls/highlight-color-popover";
import { EmojiMenu } from "./controls/emoji-menu";
import { InsertTableDialog } from "./controls/insert-table-dialog";
import { FontFamilySelect } from "./controls/font-family-select";
import { FontSizeControl } from "./controls/font-size";
import {
  DOCUMENT_EDITOR_CODE,
  ENHANCED_EDITOR_CODE,
  FULL_EDITOR_CODE,
} from "./template-code-strings";

export function DocumentEditorCard() {
  return (
    <TemplatePreview code={DOCUMENT_EDITOR_CODE}>
      <RichTextEditor.ControlsGroup>
        <FontFamilySelect />
        <FontSizeControl />
        <HighlightColorPopover />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.Code />
        <RichTextEditor.ClearFormatting />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
        <RichTextEditor.H3 />
      </RichTextEditor.ControlsGroup>
    </TemplatePreview>
  );
}

export function EnhancedEditorCard() {
  return (
    <TemplatePreview code={ENHANCED_EDITOR_CODE}>
      <RichTextEditor.ControlsGroup>
        <HeadingSelect />
        <InsertLinkDialog />
        <EmojiMenu />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.Code />
        <RichTextEditor.ClearFormatting />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.BulletList />
        <RichTextEditor.OrderedList />
        <RichTextEditor.Blockquote />
        <RichTextEditor.Hr />
      </RichTextEditor.ControlsGroup>
    </TemplatePreview>
  );
}

export function FullEditorCard() {
  return (
    <TemplatePreview code={FULL_EDITOR_CODE}>
      <RichTextEditor.ControlsGroup>
        <HeadingSelect />
        <FontFamilySelect />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <FontSizeControl />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <InsertLinkDialog />
        <EmojiMenu />
        <HighlightColorPopover />
        <InsertTableDialog />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.Code />
        <RichTextEditor.ClearFormatting />
      </RichTextEditor.ControlsGroup>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Undo />
        <RichTextEditor.Redo />
      </RichTextEditor.ControlsGroup>
    </TemplatePreview>
  );
}
