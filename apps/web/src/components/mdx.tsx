import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { EditorVariantsDemo, EditorClassNameDemo, EditorThemingDemo, EditorStickyToolbarDemo, EditorCustomControlsDemo, EditorReadOnlyDemo, EditorCustomLabelsDemo, EditorCustomIconsDemo } from '@/components/customization/editor-demos';
import { BlockEditorVariantsDemo, BlockEditorThemingDemo, BlockEditorClassNameDemo, BlockEditorCustomSlashCommandsDemo } from '@/components/customization/block-editor-demos';
import { HeadingSelectCard, InsertLinkDialogCard, HighlightColorPopoverCard, EmojiMenuCard, InsertTableDialogCard, FontFamilySelectCard, FontSizeCard } from '@/components/customization/templates-demos';
import { DocumentEditorCard, EnhancedEditorCard, FullEditorCard } from '@/components/customization/template-demos';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from '@/components/customization/pm-icons';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    EditorVariantsDemo,
    EditorClassNameDemo,
    EditorThemingDemo,
    EditorStickyToolbarDemo,
    EditorCustomControlsDemo,
    EditorReadOnlyDemo,
    EditorCustomLabelsDemo,
    EditorCustomIconsDemo,
    BlockEditorVariantsDemo,
    BlockEditorThemingDemo,
    BlockEditorClassNameDemo,
    BlockEditorCustomSlashCommandsDemo,
    HeadingSelectCard,
    InsertLinkDialogCard,
    HighlightColorPopoverCard,
    EmojiMenuCard,
    InsertTableDialogCard,
    FontFamilySelectCard,
    FontSizeCard,
    DocumentEditorCard,
    EnhancedEditorCard,
    FullEditorCard,
    NpmIcon,
    YarnIcon,
    PnpmIcon,
    BunIcon,
    ...TabsComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
