"use client";

import { TemplateCard } from "./template-card";
import { HeadingSelect } from "./controls/heading-select";
import { InsertLinkDialog } from "./controls/insert-link-dialog";
import { HighlightColorPopover } from "./controls/highlight-color-popover";
import { EmojiMenu } from "./controls/emoji-menu";
import { InsertTableDialog } from "./controls/insert-table-dialog";
import { FontFamilySelect } from "./controls/font-family-select";
import { FontSizeControl } from "./controls/font-size";
import {
  HEADING_SELECT_CODE,
  LINK_DIALOG_CODE,
  COLOR_POPOVER_CODE,
  EMOJI_MENU_CODE,
  TABLE_DIALOG_CODE,
  FONT_FAMILY_CODE,
  FONT_SIZE_CODE,
} from "./code-strings";

export function HeadingSelectCard() {
  return (
    <TemplateCard code={HEADING_SELECT_CODE}>
      <HeadingSelect />
    </TemplateCard>
  );
}

export function InsertLinkDialogCard() {
  return (
    <TemplateCard code={LINK_DIALOG_CODE}>
      <InsertLinkDialog />
    </TemplateCard>
  );
}

export function HighlightColorPopoverCard() {
  return (
    <TemplateCard code={COLOR_POPOVER_CODE}>
      <HighlightColorPopover />
    </TemplateCard>
  );
}

export function EmojiMenuCard() {
  return (
    <TemplateCard code={EMOJI_MENU_CODE}>
      <EmojiMenu />
    </TemplateCard>
  );
}

export function InsertTableDialogCard() {
  return (
    <TemplateCard code={TABLE_DIALOG_CODE}>
      <InsertTableDialog />
    </TemplateCard>
  );
}

export function FontFamilySelectCard() {
  return (
    <TemplateCard code={FONT_FAMILY_CODE}>
      <FontFamilySelect />
    </TemplateCard>
  );
}

export function FontSizeCard() {
  return (
    <TemplateCard code={FONT_SIZE_CODE}>
      <FontSizeControl />
    </TemplateCard>
  );
}
