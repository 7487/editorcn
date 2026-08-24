import React from "react";

function Svg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

function LangIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export interface RichTextEditorIcons {
  boldControlIcon: React.ReactNode;
  italicControlIcon: React.ReactNode;
  underlineControlIcon: React.ReactNode;
  strikeControlIcon: React.ReactNode;
  clearFormattingControlIcon: React.ReactNode;
  codeControlIcon: React.ReactNode;
  codeBlockControlIcon: React.ReactNode;
  h1ControlIcon: React.ReactNode;
  h2ControlIcon: React.ReactNode;
  h3ControlIcon: React.ReactNode;
  h4ControlIcon: React.ReactNode;
  h5ControlIcon: React.ReactNode;
  h6ControlIcon: React.ReactNode;
  bulletListControlIcon: React.ReactNode;
  orderedListControlIcon: React.ReactNode;
  blockquoteControlIcon: React.ReactNode;
  hrControlIcon: React.ReactNode;
  linkControlIcon: React.ReactNode;
  unlinkControlIcon: React.ReactNode;
  undoControlIcon: React.ReactNode;
  redoControlIcon: React.ReactNode;
  alignLeftControlIcon: React.ReactNode;
  alignCenterControlIcon: React.ReactNode;
  alignRightControlIcon: React.ReactNode;
  alignJustifyControlIcon: React.ReactNode;
  highlightControlIcon: React.ReactNode;
  subscriptControlIcon: React.ReactNode;
  superscriptControlIcon: React.ReactNode;
  languageIcons: Record<string, React.ReactNode>;
}

const iconProps = { className: "rte-editor-icon" };

export const DEFAULT_LANGUAGE_ICONS: Record<string, React.ReactNode> = {
  javascript: (
    <LangIcon>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M10 16V8h1.5c1.4 0 2.5.6 2.5 2 0 1-.5 1.5-1.2 1.8C13.8 12.2 15 13 15 15c0 1.8-1.4 3-3 3H9" />
      <path d="M11 8h2" />
    </LangIcon>
  ),
  typescript: (
    <LangIcon>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M8 16V8h3c1.7 0 3 1.1 3 2.8 0 1.5-.8 2.5-2 2.8.9.3 1.5 1.1 1.5 2.2 0 1.7-1.3 3.2-3 3.2H8" />
      <path d="M9 8h3" />
    </LangIcon>
  ),
  html: (
    <LangIcon>
      <path d="M4 3l1.5 18L12 23l6.5-2L20 3z" />
      <path d="M8 8h8l-.5 5-3.5 1-3.5-1z" />
      <path d="M12 14v6" />
    </LangIcon>
  ),
  css: (
    <LangIcon>
      <path d="M4 3l1.5 18L12 23l6.5-2L20 3z" />
      <path d="M8 8h8l-.3 3-3.7 1.2L7.2 11z" />
      <circle cx="12" cy="16" r="1.5" />
      <path d="M9.5 19.5l-.5-3 3 1 3-1-.5 3" />
    </LangIcon>
  ),
  json: (
    <LangIcon>
      <path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" />
      <path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2" />
    </LangIcon>
  ),
  python: (
    <LangIcon>
      <path d="M11 2c-2.2 0-4 .9-4 3v2h4v1H6.5C4 9 2 10.8 2 13.5S4 18 6.5 18H8v-2.5C8 14 9 13 10.5 13h4c1.5 0 2.5-1 2.5-2.5v-6C17 3 14 2 11 2" />
      <circle cx="8.5" cy="5.5" r=".8" fill="currentColor" stroke="none" />
      <path d="M13 22c2.2 0 4-.9 4-3v-2h-4v-1h4.5c2.5 0 4.5-1.8 4.5-4.5S19.5 7 17 7H16v2.5c0 1.5-1 2.5-2.5 2.5h-4c-1.5 0-2.5 1-2.5 2.5v6C7 21 10 22 13 22" />
      <circle cx="15.5" cy="18.5" r=".8" fill="currentColor" stroke="none" />
    </LangIcon>
  ),
  rust: (
    <LangIcon>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </LangIcon>
  ),
  go: (
    <LangIcon>
      <path d="M3 12h3m12 0h3" />
      <path d="M12 3v4m0 10v4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 8.5V7" />
      <path d="M12 17v-1.5" />
    </LangIcon>
  ),
  java: (
    <LangIcon>
      <path d="M8 4c0 0-4 1.5-4 7s4 7 4 7" />
      <path d="M16 4c0 0 4 1.5 4 7s-4 7-4 7" />
      <ellipse cx="12" cy="14" rx="4.5" ry="5" />
      <path d="M9.5 17.5L8.5 21" />
      <path d="M14.5 17.5L15.5 21" />
    </LangIcon>
  ),
  c: (
    <LangIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.5c-1-1-2.5-1.5-4-.5s-2 3-.5 4.5l4 4c1.5 1.5 3.5.5 4-.5" />
    </LangIcon>
  ),
  cpp: (
    <LangIcon>
      <circle cx="10" cy="12" r="8" />
      <path d="M12.5 9c-1-1-2.5-1-3 0s-1 2.5 0 3.5l3 3c1 1 2.5 1 3 0" />
      <circle cx="16.5" cy="15" r=".8" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="12" r=".8" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="9" r=".8" fill="currentColor" stroke="none" />
    </LangIcon>
  ),
  ruby: (
    <LangIcon>
      <polygon points="12 2 20 8 12 22 4 8" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </LangIcon>
  ),
  php: (
    <LangIcon>
      <ellipse cx="12" cy="12" rx="9" ry="6" />
      <path d="M9.5 7v10" />
      <path d="M9.5 7c2.5-1.5 5.5-.5 6.5 1.5s.5 5-1.5 6.5-5.5 1-7 0" />
    </LangIcon>
  ),
  swift: (
    <LangIcon>
      <path d="M18 4c-4 6-6.5 8.5-8.5 11 2.5-.5 4.5-1.5 5.5-4-1.5 3.5-4 6-7 7 4 1 7.5-.5 9.5-3 .5 3-1 5.5-3 6.5 5-1.5 8-5 9-9.5-1.5 4-4 6.5-6.5 8" />
    </LangIcon>
  ),
  kotlin: (
    <LangIcon>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 7v10" />
      <path d="M8 12l5.5-5.5" />
      <path d="M13.5 12H17" />
    </LangIcon>
  ),
  sql: (
    <LangIcon>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </LangIcon>
  ),
  bash: (
    <LangIcon>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M6 8.5l3.5 3.5L6 15.5" />
      <path d="M12 15.5h6" />
    </LangIcon>
  ),
  markdown: (
    <LangIcon>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 16V8l3 4 3-4v8" />
      <path d="M18 12l-3-4-3 4" />
      <path d="M15 16V8" />
    </LangIcon>
  ),
  yaml: (
    <LangIcon>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M7 8h3" />
      <path d="M7 12h5" />
      <path d="M7 16h4" />
    </LangIcon>
  ),
  xml: (
    <LangIcon>
      <polyline points="4 7 2 12 4 17" />
      <polyline points="20 7 22 12 20 17" />
      <line x1="14" y1="4" x2="10" y2="20" />
      <line x1="7" y1="8" x2="17" y2="16" />
    </LangIcon>
  ),
  plaintext: (
    <LangIcon>
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <line x1="7" y1="7" x2="17" y2="7" />
      <line x1="7" y1="11" x2="15" y2="11" />
      <line x1="7" y1="15" x2="13" y2="15" />
    </LangIcon>
  ),
};

export const DEFAULT_ICONS: RichTextEditorIcons = {
  boldControlIcon: (
    <Svg {...iconProps}>
      <path d="M6 4h7a4 4 0 0 1 0 8H6z" />
      <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
    </Svg>
  ),
  italicControlIcon: (
    <Svg {...iconProps}>
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </Svg>
  ),
  underlineControlIcon: (
    <Svg {...iconProps}>
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </Svg>
  ),
  strikeControlIcon: (
    <Svg {...iconProps}>
      <path d="M16 4H9.5a3.5 3.5 0 0 0-2.9 5.4" />
      <path d="M14.5 14.6a3.5 3.5 0 0 1-2.9 5.4H8" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </Svg>
  ),
  clearFormattingControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 7V4h16v3" />
      <path d="M5 20h6" />
      <path d="M13 4 8 20" />
      <path d="m16 16 5 5" />
      <path d="m21 16-5 5" />
    </Svg>
  ),
  codeControlIcon: (
    <Svg {...iconProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  ),
  codeBlockControlIcon: (
    <Svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <polyline points="10 9 8 12 10 15" />
      <polyline points="14 9 16 12 14 15" />
    </Svg>
  ),
  h1ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="m17 10 3-2v8" />
    </Svg>
  ),
  h2ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M17 9.5a2.5 2.5 0 0 1 4.8-1c0 2-4.8 2.5-4.8 5.5h5" />
    </Svg>
  ),
  h3ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M17.5 9.5c1.5-1 3.5-.2 3.5 1.3a1.8 1.8 0 0 1-1.8 1.7" />
      <path d="M19.2 12.5a1.8 1.8 0 0 1 1.8 1.7c0 1.5-2 2.3-3.5 1.3" />
    </Svg>
  ),
  h4ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M20 9v5h-4l3.5-5.5" />
      <path d="M20 14v3" />
    </Svg>
  ),
  h5ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M21 9h-4v3.5c2.5-.7 4.5.3 4.5 2a2.3 2.3 0 0 1-4.3 1.3" />
    </Svg>
  ),
  h6ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M20.5 9.5c-3 1-3.5 4-3.5 5.5a2.5 2.5 0 1 0 2.5-2.5c-1 0-2 .4-2.5 1" />
    </Svg>
  ),
  bulletListControlIcon: (
    <Svg {...iconProps}>
      <line x1="9" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="9" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  ),
  orderedListControlIcon: (
    <Svg {...iconProps}>
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 5h2v4" />
      <path d="M4 9h2" />
      <path d="M4 13h2.5L4 16h2.5" />
      <path d="M4 19h2.5" />
    </Svg>
  ),
  blockquoteControlIcon: (
    <Svg {...iconProps}>
      <path d="M7 8a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6a3 3 0 0 1 2-3" />
      <path d="M16 8a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a3 3 0 0 1 2-3" />
    </Svg>
  ),
  hrControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="12" x2="20" y2="12" />
    </Svg>
  ),
  linkControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 17H7a5 5 0 0 1 0-10h2" />
      <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </Svg>
  ),
  unlinkControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 17H7a5 5 0 0 1-1.7-9.7" />
      <path d="M15 7h2a5 5 0 0 1 1.7 9.7" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </Svg>
  ),
  undoControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </Svg>
  ),
  redoControlIcon: (
    <Svg {...iconProps}>
      <path d="m15 14 5-5-5-5" />
      <path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
    </Svg>
  ),
  alignLeftControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="18" x2="17" y2="18" />
    </Svg>
  ),
  alignCenterControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="5.5" y1="18" x2="18.5" y2="18" />
    </Svg>
  ),
  alignRightControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="7" y1="18" x2="20" y2="18" />
    </Svg>
  ),
  alignJustifyControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </Svg>
  ),
  highlightControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 11 3 17v3h3l6-6" />
      <path d="M14 6l4-4 4 4-4 4" />
      <path d="m9 11 4-4 5 5-4 4" />
    </Svg>
  ),
  subscriptControlIcon: (
    <Svg {...iconProps}>
      <path d="m4 4 8 9" />
      <path d="m12 4-8 9" />
      <path d="M19 16h-3.5c0-1.6 3.5-1.9 3.5-3.8a1.8 1.8 0 0 0-3.3-1" />
    </Svg>
  ),
  superscriptControlIcon: (
    <Svg {...iconProps}>
      <path d="m4 20 8-9" />
      <path d="m12 20-8-9" />
      <path d="M19 11h-3.5c0-1.6 3.5-1.9 3.5-3.8a1.8 1.8 0 0 0-3.3-1" />
    </Svg>
  ),
  languageIcons: DEFAULT_LANGUAGE_ICONS,
};
