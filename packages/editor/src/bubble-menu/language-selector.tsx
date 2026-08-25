import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { CODE_BLOCK_LANGUAGES, useEditorState } from "./utils";
import { useRichTextEditorContext } from "../rte-context";

function FallbackIcon() {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function LanguageSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const { icons } = useRichTextEditorContext();
  const { currentLanguage } = useEditorState(editor, (ed) => ({
    currentLanguage: ed.getAttributes("codeBlock").language || "javascript",
  }));

  const langIcon = icons.languageIcons[currentLanguage] ?? <FallbackIcon />;

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="rte-bubble-btn"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen(!open)}
      >
        <span className="rte-bubble-btn-icon">{langIcon}</span>
        <span className="rte-bubble-btn-text">{currentLanguage}</span>
        <span className="rte-bubble-btn-icon" style={{ width: 12, height: 12 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        <>
          <div className="rte-bubble-overlay" onClick={() => setOpen(false)} />
          <div
            className="rte-bubble-dropdown rte-bubble-dropdown--language"
          >
            {CODE_BLOCK_LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`rte-bubble-dropdown-item${currentLanguage === lang ? " rte-bubble-dropdown-item--active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .updateAttributes("codeBlock", { language: lang })
                    .run();
                  setOpen(false);
                }}
              >
                <span className="rte-bubble-dropdown-icon">
                  {icons.languageIcons[lang] ?? <FallbackIcon />}
                </span>
                <span>{lang}</span>
                {currentLanguage === lang && (
                  <span className="rte-bubble-dropdown-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
