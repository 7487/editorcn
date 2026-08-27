import * as React from "react";

export interface BubbleDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "default" | "align" | "language";
}

const alignClass: Record<string, string> = {
  align: "block-editor-bubble-dropdown--align",
  default: "",
  language: "block-editor-bubble-dropdown--language",
};

const BubbleDropdown = React.forwardRef<HTMLDivElement, BubbleDropdownProps>(
  ({ className = "", align = "default", ...props }, ref) => {
    const cls = ["block-editor-bubble-dropdown", alignClass[align], className]
      .filter(Boolean)
      .join(" ");
    return <div ref={ref} className={cls} {...props} />;
  }
);
BubbleDropdown.displayName = "BubbleDropdown";

export { BubbleDropdown };
