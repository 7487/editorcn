import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { DEFAULT_ICONS } from "../icons";
import { CODE_BLOCK_LANGUAGES } from "./utils";
import { useEditorState } from "./utils";
import { useBlockEditorContext } from "../context";

export function LanguageSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const { icons } = useBlockEditorContext();

  const { currentLanguage } = useEditorState(editor, (ed) => ({
    currentLanguage: ed.getAttributes("codeBlock").language || "javascript",
  }));

  const langIcon = icons.languageIcons[currentLanguage] ?? icons.codeBlockLanguageIcon;

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="block-editor-bubble-btn"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen(!open)}
      >
        <span className="block-editor-bubble-dropdown-icon">{langIcon}</span>
        <span className="block-editor-bubble-btn-text">{currentLanguage}</span>
        {DEFAULT_ICONS.dropdownArrowIcon}
      </button>
      {open && (
        <>
          <div
            className="block-editor-bubble-overlay"
            onClick={() => setOpen(false)}
          />
          <div
            className="block-editor-bubble-dropdown block-editor-bubble-dropdown--language"
            style={{ right: 0, left: "auto" }}
          >
            {CODE_BLOCK_LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`block-editor-bubble-dropdown-item${currentLanguage === lang ? " block-editor-bubble-dropdown-item--active" : ""}`}
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
                <span className="block-editor-bubble-dropdown-icon">
                  {icons.languageIcons[lang] ?? icons.codeBlockLanguageIcon}
                </span>
                <span>{lang}</span>
                {currentLanguage === lang && (
                  <span className="block-editor-bubble-dropdown-icon">
                    {DEFAULT_ICONS.checkIcon}
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
