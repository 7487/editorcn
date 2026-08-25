"use no memo";

import type { ChainedCommands, Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import React from "react";

import type { RichTextEditorIcons } from "../icons";
import type { RichTextEditorLabels } from "../labels";
import { useRichTextEditorContext } from "../rte-context";
import type { RichTextEditorControlProps } from "../types";
import { Toggle } from "../ui/toggle";
import { cn } from "../ui/utils";

type IsActiveConfig =
  | { name: string; attributes?: Record<string, unknown> | string }
  | { attrs: Record<string, unknown> };

type ChainCommand = (
  attributes?: Record<string, unknown> | string
) => Pick<ChainedCommands, "run">;

interface CreateControlProps {
  label: keyof RichTextEditorLabels;
  iconKey: Exclude<keyof RichTextEditorIcons, "languageIcons">;
  isActive?: IsActiveConfig;
  isDisabled?: (editor: Editor) => boolean;
  operation: { name: string; attributes?: Record<string, unknown> | string };
}

export const RichTextEditorControl = ({
  active,
  interactive: _interactive = true,
  className,
  children,
  onMouseDown,
  onClick,
  disabled,
  ...props
}: RichTextEditorControlProps) => (
  <Toggle
    size="sm"
    pressed={active}
    disabled={disabled}
    aria-label={props["aria-label"]}
    title={props.title}
    className={cn("rte-control-button", className)}
    onMouseDown={(e) => {
      e.preventDefault();
      onMouseDown?.(e);
    }}
    onPressedChange={() => onClick?.({} as React.MouseEvent<HTMLButtonElement>)}
  >
    {children}
  </Toggle>
);

export const createControl = ({
  label,
  iconKey,
  isActive,
  isDisabled,
  operation,
}: CreateControlProps) => {
  const Control = ({ className }: { className?: string }) => {
    const { editor, labels, icons } = useRichTextEditorContext();
    const ariaLabel = labels[label] as string;
    const activeConfig = isActive;
    const checkDisabled = isDisabled;

    const editorState = useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const safeEditor =
          ctx.editor && !ctx.editor.isDestroyed ? ctx.editor : null;
        const checkIsActive = () => {
          if (!safeEditor || !activeConfig) {
            return false;
          }
          if ("attrs" in activeConfig) {
            return safeEditor.isActive(activeConfig.attrs);
          }
          return safeEditor.isActive(
            activeConfig.name,
            activeConfig.attributes
          );
        };

        return {
          active: checkIsActive(),
          disabled: safeEditor ? (checkDisabled?.(safeEditor) ?? false) : true,
        };
      },
    });

    const active = editorState?.active ?? false;
    const disabled = editorState?.disabled ?? true;

    return (
      <RichTextEditorControl
        active={active}
        disabled={disabled}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={className}
        onClick={() => {
          if (!editor || editor.isDestroyed) {
            return;
          }
          const commands = editor.chain().focus() as unknown as Record<
            string,
            ChainCommand
          >;
          commands[operation.name]?.(operation.attributes).run();
        }}
      >
        {icons[iconKey]}
      </RichTextEditorControl>
    );
  };

  Control.displayName = `RichTextEditor.${String(label)}`;
  return Control;
};
