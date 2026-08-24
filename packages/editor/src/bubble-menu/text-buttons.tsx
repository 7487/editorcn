import { type Editor } from "@tiptap/react";
import { useEditorState } from "./utils";

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="rte-editor-icon"
    >
      {children}
    </svg>
  );
}

interface TextSelectorResult {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
}

const textItems = [
  {
    icon: (
      <Svg>
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      </Svg>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- extension commands not in base ChainedCommands
    command: (e: Editor) => (e.chain().focus() as any).toggleBold().run(),
    isActive: (s: TextSelectorResult) => s.isBold,
  },
  {
    icon: (
      <Svg>
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
      </Svg>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleItalic().run(),
    isActive: (s: TextSelectorResult) => s.isItalic,
  },
  {
    icon: (
      <Svg>
        <path d="M6 4v6a6 6 0 0 0 12 0V4" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </Svg>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleUnderline().run(),
    isActive: (s: TextSelectorResult) => s.isUnderline,
  },
  {
    icon: (
      <Svg>
        <path d="M16 4H9.5a3.5 3.5 0 0 0-2.9 5.4" />
        <path d="M14.5 14.6a3.5 3.5 0 0 1-2.9 5.4H8" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </Svg>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleStrike().run(),
    isActive: (s: TextSelectorResult) => s.isStrike,
  },
  {
    icon: (
      <Svg>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </Svg>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: (e: Editor) => (e.chain().focus() as any).toggleCode().run(),
    isActive: (s: TextSelectorResult) => s.isCode,
  },
];

export function TextButtons({ editor }: { editor: Editor }) {
  const editorState = useEditorState(editor, (ed) => ({
    isBold: ed.isActive("bold"),
    isItalic: ed.isActive("italic"),
    isUnderline: ed.isActive("underline"),
    isStrike: ed.isActive("strike"),
    isCode: ed.isActive("code"),
  }));

  return (
    <div className="rte-bubble-group">
      {textItems.map((item, i) => (
        <button
          key={i}
          type="button"
          className={`rte-bubble-btn${item.isActive(editorState) ? " rte-bubble-btn--active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => item.command(editor)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
