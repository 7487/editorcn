"use client";

import {
  HEADING_SELECT_CODE,
  LINK_DIALOG_CODE,
  COLOR_POPOVER_CODE,
  EMOJI_MENU_CODE,
  TABLE_DIALOG_CODE,
  FONT_FAMILY_CODE,
  FONT_SIZE_CODE,
} from "./code-strings";
import { EmojiMenu } from "./controls/emoji-menu";
import { FontFamilySelect } from "./controls/font-family-select";
import { FontSizeControl } from "./controls/font-size";
import { HeadingSelect } from "./controls/heading-select";
import { HighlightColorPopover } from "./controls/highlight-color-popover";
import { InsertLinkDialog } from "./controls/insert-link-dialog";
import { InsertTableDialog } from "./controls/insert-table-dialog";
import { TemplateCard } from "./template-card";

export const HeadingSelectCard = () => (
  <TemplateCard code={HEADING_SELECT_CODE}>
    <HeadingSelect />
  </TemplateCard>
);

export const InsertLinkDialogCard = () => (
  <TemplateCard code={LINK_DIALOG_CODE}>
    <InsertLinkDialog />
  </TemplateCard>
);

export const HighlightColorPopoverCard = () => (
  <TemplateCard code={COLOR_POPOVER_CODE}>
    <HighlightColorPopover />
  </TemplateCard>
);

export const EmojiMenuCard = () => (
  <TemplateCard code={EMOJI_MENU_CODE}>
    <EmojiMenu />
  </TemplateCard>
);

export const InsertTableDialogCard = () => (
  <TemplateCard code={TABLE_DIALOG_CODE}>
    <InsertTableDialog />
  </TemplateCard>
);

export const FontFamilySelectCard = () => (
  <TemplateCard code={FONT_FAMILY_CODE}>
    <FontFamilySelect />
  </TemplateCard>
);

export const FontSizeCard = () => (
  <TemplateCard code={FONT_SIZE_CODE}>
    <FontSizeControl />
  </TemplateCard>
);
