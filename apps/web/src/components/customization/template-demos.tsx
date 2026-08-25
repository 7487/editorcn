"use client";

import { RichTextEditor } from "@editorcn/editor";

import { EmojiMenu } from "./controls/emoji-menu";
import { FontFamilySelect } from "./controls/font-family-select";
import { FontSizeControl } from "./controls/font-size";
import { HeadingSelect } from "./controls/heading-select";
import { HighlightColorPopover } from "./controls/highlight-color-popover";
import { InsertLinkDialog } from "./controls/insert-link-dialog";
import { InsertTableDialog } from "./controls/insert-table-dialog";
import {
  DOCUMENT_EDITOR_CODE,
  ENHANCED_EDITOR_CODE,
  FULL_EDITOR_CODE,
} from "./template-code-strings";
import { TemplatePreview } from "./template-preview";

export const DocumentEditorCard = () => (
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

export const EnhancedEditorCard = () => (
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

export const FullEditorCard = () => (
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
