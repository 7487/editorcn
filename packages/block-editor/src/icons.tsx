import React from "react";

function Svg({
  children,
  className,
  width = 24,
  height = 24,
}: {
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export interface BlockEditorIcons {
  slashTextIcon: React.ReactNode;
  slashHeadingIcon: React.ReactNode;
  slashBulletListIcon: React.ReactNode;
  slashOrderedListIcon: React.ReactNode;
  slashTaskListIcon: React.ReactNode;
  slashBlockquoteIcon: React.ReactNode;
  slashCodeBlockIcon: React.ReactNode;
  slashDividerIcon: React.ReactNode;
  slashImageIcon: React.ReactNode;
  slashTableIcon: React.ReactNode;
  searchIcon: React.ReactNode;
  fallbackIcon: React.ReactNode;
  dragHandleIcon: React.ReactNode;
  boldIcon: React.ReactNode;
  italicIcon: React.ReactNode;
  underlineIcon: React.ReactNode;
  strikethroughIcon: React.ReactNode;
  codeIcon: React.ReactNode;
  alignLeftIcon: React.ReactNode;
  alignCenterIcon: React.ReactNode;
  alignRightIcon: React.ReactNode;
  linkIcon: React.ReactNode;
  unlinkIcon: React.ReactNode;
  checkIcon: React.ReactNode;
  copyIcon: React.ReactNode;
  deleteIcon: React.ReactNode;
  dropdownArrowIcon: React.ReactNode;
}

export const DEFAULT_ICONS: BlockEditorIcons = {
  slashTextIcon: (
    <Svg>
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </Svg>
  ),
  slashHeadingIcon: (
    <Svg>
      <path d="M6 12h12" />
      <path d="M6 20V4" />
      <path d="M18 20V4" />
    </Svg>
  ),
  slashBulletListIcon: (
    <Svg>
      <line x1="9" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="9" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  ),
  slashOrderedListIcon: (
    <Svg>
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 5h2v4" />
      <path d="M4 9h2" />
      <path d="M4 13h2.5L4 16h2.5" />
      <path d="M4 19h2.5" />
    </Svg>
  ),
  slashTaskListIcon: (
    <Svg>
      <rect x="3" y="5" width="6" height="6" rx="1" />
      <path d="M5 8l1.5 1.5L9 6" />
      <line x1="12" y1="8" x2="21" y2="8" />
      <rect x="3" y="13" width="6" height="6" rx="1" />
      <line x1="12" y1="16" x2="21" y2="16" />
    </Svg>
  ),
  slashBlockquoteIcon: (
    <Svg>
      <path d="M7 8a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6a3 3 0 0 1 2-3" />
      <path d="M16 8a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a3 3 0 0 1 2-3" />
    </Svg>
  ),
  slashCodeBlockIcon: (
    <Svg>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  ),
  slashDividerIcon: (
    <Svg>
      <line x1="2" y1="12" x2="22" y2="12" />
    </Svg>
  ),
  slashImageIcon: (
    <Svg>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </Svg>
  ),
  slashTableIcon: (
    <Svg>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </Svg>
  ),
  searchIcon: (
    <Svg width={14} height={14}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Svg>
  ),
  fallbackIcon: (
    <Svg>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </Svg>
  ),
  dragHandleIcon: (
    <Svg className="block-editor-drag-handle-icon">
      <circle cx="9" cy="5" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="19" r="1" />
    </Svg>
  ),
  boldIcon: (
    <Svg>
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </Svg>
  ),
  italicIcon: (
    <Svg>
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </Svg>
  ),
  underlineIcon: (
    <Svg>
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </Svg>
  ),
  strikethroughIcon: (
    <Svg>
      <path d="M16 4H9.5a3.5 3.5 0 0 0-2.9 5.4" />
      <path d="M14.5 14.6a3.5 3.5 0 0 1-2.9 5.4H8" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </Svg>
  ),
  codeIcon: (
    <Svg>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  ),
  alignLeftIcon: (
    <Svg>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="18" x2="17" y2="18" />
    </Svg>
  ),
  alignCenterIcon: (
    <Svg>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="5.5" y1="18" x2="18.5" y2="18" />
    </Svg>
  ),
  alignRightIcon: (
    <Svg>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="7" y1="18" x2="20" y2="18" />
    </Svg>
  ),
  linkIcon: (
    <Svg>
      <path d="M9 17H7a5 5 0 0 1 0-10h2" />
      <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </Svg>
  ),
  unlinkIcon: (
    <Svg>
      <path d="M9 17H7a5 5 0 0 1-1.7-9.7" />
      <path d="M15 7h2a5 5 0 0 1 1.7 9.7" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </Svg>
  ),
  checkIcon: (
    <Svg>
      <polyline points="20 6 9 17 4 12" />
    </Svg>
  ),
  copyIcon: (
    <Svg>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Svg>
  ),
  deleteIcon: (
    <Svg>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </Svg>
  ),
  dropdownArrowIcon: (
    <Svg width={12} height={12}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  ),
};
