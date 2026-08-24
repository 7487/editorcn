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
  codeBlockLanguageIcon: React.ReactNode;
  languageIcons: Record<string, React.ReactNode>;
}

export const DEFAULT_LANGUAGE_ICONS: Record<string, React.ReactNode> = {
  javascript: (
    <Svg>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M10 16V8h1.5c1.4 0 2.5.6 2.5 2 0 1-.5 1.5-1.2 1.8C13.8 12.2 15 13 15 15c0 1.8-1.4 3-3 3H9" />
      <path d="M11 8h2" />
    </Svg>
  ),
  typescript: (
    <Svg>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M8 16V8h3c1.7 0 3 1.1 3 2.8 0 1.5-.8 2.5-2 2.8.9.3 1.5 1.1 1.5 2.2 0 1.7-1.3 3.2-3 3.2H8" />
      <path d="M9 8h3" />
    </Svg>
  ),
  html: (
    <Svg>
      <path d="M4 3l1.5 18L12 23l6.5-2L20 3z" />
      <path d="M8 8h8l-.5 5-3.5 1-3.5-1z" />
      <path d="M12 14v6" />
    </Svg>
  ),
  css: (
    <Svg>
      <path d="M4 3l1.5 18L12 23l6.5-2L20 3z" />
      <path d="M8 8h8l-.3 3-3.7 1.2L7.2 11z" />
      <circle cx="12" cy="16" r="1.5" />
      <path d="M9.5 19.5l-.5-3 3 1 3-1-.5 3" />
    </Svg>
  ),
  json: (
    <Svg>
      <path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" />
      <path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2" />
    </Svg>
  ),
  python: (
    <Svg>
      <path d="M11 2c-2.2 0-4 .9-4 3v2h4v1H6.5C4 9 2 10.8 2 13.5S4 18 6.5 18H8v-2.5C8 14 9 13 10.5 13h4c1.5 0 2.5-1 2.5-2.5v-6C17 3 14 2 11 2" />
      <circle cx="8.5" cy="5.5" r=".8" fill="currentColor" stroke="none" />
      <path d="M13 22c2.2 0 4-.9 4-3v-2h-4v-1h4.5c2.5 0 4.5-1.8 4.5-4.5S19.5 7 17 7H16v2.5c0 1.5-1 2.5-2.5 2.5h-4c-1.5 0-2.5 1-2.5 2.5v6C7 21 10 22 13 22" />
      <circle cx="15.5" cy="18.5" r=".8" fill="currentColor" stroke="none" />
    </Svg>
  ),
  rust: (
    <Svg>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </Svg>
  ),
  go: (
    <Svg>
      <path d="M3 12h3m12 0h3" />
      <path d="M12 3v4m0 10v4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 8.5V7" />
      <path d="M12 17v-1.5" />
    </Svg>
  ),
  java: (
    <Svg>
      <path d="M8 4c0 0-4 1.5-4 7s4 7 4 7" />
      <path d="M16 4c0 0 4 1.5 4 7s-4 7-4 7" />
      <ellipse cx="12" cy="14" rx="4.5" ry="5" />
      <path d="M9.5 17.5L8.5 21" />
      <path d="M14.5 17.5L15.5 21" />
    </Svg>
  ),
  c: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.5c-1-1-2.5-1.5-4-.5s-2 3-.5 4.5l4 4c1.5 1.5 3.5.5 4-.5" />
    </Svg>
  ),
  cpp: (
    <Svg>
      <circle cx="10" cy="12" r="8" />
      <path d="M12.5 9c-1-1-2.5-1-3 0s-1 2.5 0 3.5l3 3c1 1 2.5 1 3 0" />
      <circle cx="16.5" cy="15" r=".8" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="12" r=".8" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="9" r=".8" fill="currentColor" stroke="none" />
    </Svg>
  ),
  ruby: (
    <Svg>
      <polygon points="12 2 20 8 12 22 4 8" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </Svg>
  ),
  php: (
    <Svg>
      <ellipse cx="12" cy="12" rx="9" ry="6" />
      <path d="M9.5 7v10" />
      <path d="M9.5 7c2.5-1.5 5.5-.5 6.5 1.5s.5 5-1.5 6.5-5.5 1-7 0" />
    </Svg>
  ),
  swift: (
    <Svg>
      <path d="M18 4c-4 6-6.5 8.5-8.5 11 2.5-.5 4.5-1.5 5.5-4-1.5 3.5-4 6-7 7 4 1 7.5-.5 9.5-3 .5 3-1 5.5-3 6.5 5-1.5 8-5 9-9.5-1.5 4-4 6.5-6.5 8" />
    </Svg>
  ),
  kotlin: (
    <Svg>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 7v10" />
      <path d="M8 12l5.5-5.5" />
      <path d="M13.5 12H17" />
    </Svg>
  ),
  sql: (
    <Svg>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </Svg>
  ),
  bash: (
    <Svg>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M6 8.5l3.5 3.5L6 15.5" />
      <path d="M12 15.5h6" />
    </Svg>
  ),
  markdown: (
    <Svg>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 16V8l3 4 3-4v8" />
      <path d="M18 12l-3-4-3 4" />
      <path d="M15 16V8" />
    </Svg>
  ),
  yaml: (
    <Svg>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M7 8h3" />
      <path d="M7 12h5" />
      <path d="M7 16h4" />
    </Svg>
  ),
  xml: (
    <Svg>
      <polyline points="4 7 2 12 4 17" />
      <polyline points="20 7 22 12 20 17" />
      <line x1="14" y1="4" x2="10" y2="20" />
      <line x1="7" y1="8" x2="17" y2="16" />
    </Svg>
  ),
  plaintext: (
    <Svg>
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <line x1="7" y1="7" x2="17" y2="7" />
      <line x1="7" y1="11" x2="15" y2="11" />
      <line x1="7" y1="15" x2="13" y2="15" />
    </Svg>
  ),
};

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
  codeBlockLanguageIcon: (
    <Svg>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  ),
  languageIcons: DEFAULT_LANGUAGE_ICONS,
};
