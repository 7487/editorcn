import type { ElementType, HTMLAttributes } from "react";
import { createElement } from "react";

import { cn } from "./lib/utils";

export type StaticRendererProps = Omit<
  HTMLAttributes<HTMLElement>,
  "dangerouslySetInnerHTML"
> & {
  /**
   * HTML produced by `editor.getHTML()` from either `@editorcn/editor` or
   * `@editorcn/block-editor`. Rendered read-only.
   */
  content: string;
  /**
   * Element used as the renderer's root. Defaults to `"div"`.
   */
  as?: ElementType;
};

export const StaticRenderer = ({
  as: Tag = "div",
  className,
  content,
  ...props
}: StaticRendererProps) =>
  createElement(Tag, {
    ...props,
    className: cn("rte-static-renderer", className),
    dangerouslySetInnerHTML: { __html: content },
  });
