export const DOCUMENT_EDITOR_CODE = `import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import { Extension } from "@tiptap/core";
import { RichTextEditor } from "@rtecn/editor";
import { FontFamilySelect } from "@/components/custom-controls/font-family-select";
import { FontSizeControl } from "@/components/custom-controls/font-size";
import { HighlightColorPopover } from "@/components/custom-controls/highlight-color-popover";

const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: \`font-size: \${attributes.fontSize}\` };
            },
          },
        },
      },
    ];
  },
});

export function DocumentEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: "Start typing..." }),
      TextStyle,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
    ],
    content: "<p>Start typing...</p>",
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <FontFamilySelect />
          <FontSizeControl />
          <HighlightColorPopover />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}`;

export const ENHANCED_EDITOR_CODE = `import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import { RichTextEditor, Link } from "@rtecn/editor";
import { HeadingSelect } from "@/components/custom-controls/heading-select";
import { InsertLinkDialog } from "@/components/custom-controls/insert-link-dialog";
import { EmojiMenu } from "@/components/custom-controls/emoji-menu";

export function EnhancedEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({ openOnClick: true }),
      Placeholder.configure({ placeholder: "Start typing..." }),
    ],
    content: "<p>Start typing...</p>",
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <HeadingSelect />
          <InsertLinkDialog />
          <EmojiMenu />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}`;

export const FULL_EDITOR_CODE = `import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import LinkExtension from "@tiptap/extension-link";
import { Extension } from "@tiptap/core";
import { RichTextEditor, Link } from "@rtecn/editor";
import { HeadingSelect } from "@/components/custom-controls/heading-select";
import { FontFamilySelect } from "@/components/custom-controls/font-family-select";
import { FontSizeControl } from "@/components/custom-controls/font-size";
import { InsertLinkDialog } from "@/components/custom-controls/insert-link-dialog";
import { EmojiMenu } from "@/components/custom-controls/emoji-menu";
import { HighlightColorPopover } from "@/components/custom-controls/highlight-color-popover";
import { InsertTableDialog } from "@/components/custom-controls/insert-table-dialog";

const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: \`font-size: \${attributes.fontSize}\` };
            },
          },
        },
      },
    ];
  },
});

export function FullEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: "Start typing..." }),
      TextStyle,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
      LinkExtension.configure({ openOnClick: true }),
    ],
    content: "<p>Start typing...</p>",
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <HeadingSelect />
          <FontFamilySelect />
          <FontSizeControl />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <InsertLinkDialog />
          <EmojiMenu />
          <HighlightColorPopover />
          <InsertTableDialog />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}`;
