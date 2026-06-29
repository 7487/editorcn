import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function read(pkg, file) {
  return readFileSync(resolve(root, "packages", pkg, "src", file), "utf-8");
}

function readRegistry(pkg, file) {
  return readFileSync(resolve(root, "packages", pkg, "src", "custom-controls", file), "utf-8");
}

function readRegistryExtension(pkg, file) {
  return readFileSync(resolve(root, "packages", pkg, "src", "extensions", file), "utf-8");
}

function entry(path, type, pkg, src) {
  const target = `@components/${path}`;
  return { path, type, target, content: read(pkg, src) };
}

const editorFiles = [
  entry("rte-editor/index.ts", "registry:component", "editor", "index.ts"),
  entry("rte-editor/rte-text-editor.tsx", "registry:component", "editor", "rte-text-editor.tsx"),
  entry("rte-editor/rte-context.ts", "registry:component", "editor", "rte-context.ts"),
  entry("rte-editor/rte-toolbar.tsx", "registry:component", "editor", "rte-toolbar.tsx"),
  entry("rte-editor/rte-content.tsx", "registry:component", "editor", "rte-content.tsx"),
  entry("rte-editor/rte-controls-group.tsx", "registry:component", "editor", "rte-controls-group.tsx"),
  entry("rte-editor/labels.ts", "registry:component", "editor", "labels.ts"),
  entry("rte-editor/icons.tsx", "registry:component", "editor", "icons.tsx"),
  entry("rte-editor/types.ts", "registry:component", "editor", "types.ts"),
  entry("rte-editor/style.css", "registry:style", "editor", "style.css"),
  entry("rte-editor/controls/rte-control.tsx", "registry:component", "editor", "controls/rte-control.tsx"),
  entry("rte-editor/controls/rte-controls.tsx", "registry:component", "editor", "controls/rte-controls.tsx"),
  entry("rte-editor/controls/rte-link-control.tsx", "registry:component", "editor", "controls/rte-link-control.tsx"),
  entry("rte-editor/extensions/index.ts", "registry:component", "editor", "extensions/index.ts"),
  entry("rte-editor/extensions/link.ts", "registry:component", "editor", "extensions/link.ts"),
  entry("rte-editor/extensions/resizable-node-view.tsx", "registry:component", "editor", "extensions/resizable-node-view.tsx"),
  entry("rte-editor/controls/rte-twitter-control.tsx", "registry:component", "editor", "controls/rte-twitter-control.tsx"),
  entry("rte-editor/controls/rte-youtube-control.tsx", "registry:component", "editor", "controls/rte-youtube-control.tsx"),
  entry("rte-editor/ui/utils.ts", "registry:lib", "editor", "ui/utils.ts"),
  entry("rte-editor/ui/button.tsx", "registry:component", "editor", "ui/button.tsx"),
  entry("rte-editor/ui/toggle.tsx", "registry:component", "editor", "ui/toggle.tsx"),
  entry("rte-editor/ui/popover.tsx", "registry:component", "editor", "ui/popover.tsx"),
  entry("rte-editor/ui/input.tsx", "registry:component", "editor", "ui/input.tsx"),
];

const blockEditorFiles = [
  entry("rte-block-editor/index.ts", "registry:component", "block-editor", "index.ts"),
  entry("rte-block-editor/block-editor.tsx", "registry:component", "block-editor", "block-editor.tsx"),
  entry("rte-block-editor/bubble-menu.tsx", "registry:component", "block-editor", "bubble-menu.tsx"),
  entry("rte-block-editor/context.tsx", "registry:component", "block-editor", "context.tsx"),
  entry("rte-block-editor/labels.ts", "registry:component", "block-editor", "labels.ts"),
  entry("rte-block-editor/types.ts", "registry:component", "block-editor", "types.ts"),
  entry("rte-block-editor/style.css", "registry:style", "block-editor", "style.css"),
  entry("rte-block-editor/extensions/index.ts", "registry:component", "block-editor", "extensions/index.ts"),
  entry("rte-block-editor/extensions/slash-command/index.ts", "registry:component", "block-editor", "extensions/slash-command/index.ts"),
  entry("rte-block-editor/extensions/slash-command/slash-command.ts", "registry:component", "block-editor", "extensions/slash-command/slash-command.ts"),
  entry("rte-block-editor/extensions/slash-command/suggestion.ts", "registry:component", "block-editor", "extensions/slash-command/suggestion.ts"),
  entry("rte-block-editor/extensions/slash-command/suggestion-list.tsx", "registry:component", "block-editor", "extensions/slash-command/suggestion-list.tsx"),
  entry("rte-block-editor/ui/index.ts", "registry:component", "block-editor", "ui/index.ts"),
  entry("rte-block-editor/ui/alert.tsx", "registry:component", "block-editor", "ui/alert.tsx"),
  entry("rte-block-editor/ui/button.tsx", "registry:component", "block-editor", "ui/button.tsx"),
  entry("rte-block-editor/ui/label.tsx", "registry:component", "block-editor", "ui/label.tsx"),
  entry("rte-block-editor/ui/scroll-area.tsx", "registry:component", "block-editor", "ui/scroll-area.tsx"),
  entry("rte-block-editor/ui/textarea.tsx", "registry:component", "block-editor", "ui/textarea.tsx"),
  entry("rte-block-editor/lib/utils.ts", "registry:lib", "block-editor", "lib/utils.ts"),
];

// const customControlNames = [
//   "heading-select", "insert-link-dialog", "highlight-color-popover",
//   "emoji-menu", "insert-table-dialog", "font-family-select",
//   "font-size",
// ];

// const customControlExtensionNames = [
//   "font-size-extension",
// ];

// function entryRegistry(name) {
//   const path = `custom-controls/${name}.tsx`;
//   const target = `@components/${path}`;
//   return { path, type: "registry:component", target, content: readRegistry("registry", `${name}.tsx`) };
// }

// function entryRegistryExtension(name) {
//   const path = `extensions/${name}.ts`;
//   const target = `@components/${path}`;
//   return { path, type: "registry:component", target, content: readRegistryExtension("registry", `${name}.ts`) };
// }

// const customControlFiles = [
//   ...customControlNames.map(entryRegistry),
//   ...customControlExtensionNames.map(entryRegistryExtension),
// ];

// const customControlRegistryDeps = ["select", "dialog", "popover", "dropdown-menu", "button", "input"];

const deps = {
  editor: [
    "@tiptap/core@>=2.11.5 <4",
    "@tiptap/react@>=2.11.5 <4",
    "@tiptap/pm@>=2.11.5 <4",
    "@tiptap/starter-kit@>=2.11.5 <4",
    "@tiptap/extension-link@>=2.11.5 <4",
    "@tiptap/extension-underline@>=2.11.5 <4",
    "@tiptap/extension-highlight@>=2.11.5 <4",
    "@tiptap/extension-text-align@>=2.11.5 <4",
    "@tiptap/extension-subscript@>=2.11.5 <4",
    "@tiptap/extension-superscript@>=2.11.5 <4",
    "@tiptap/extension-code-block-lowlight@>=2.11.5 <4",
    "@tiptap/extension-placeholder@>=2.11.5 <4",
    "@base-ui/react@^1.0.0",
    "lowlight@^3.3.0",
    "class-variance-authority@^0.7.1",
    "clsx@^2.1.1",
    "tailwind-merge@^3.0.0",
  ],
  "block-editor": [
    "@tiptap/react@>=2.11.5 <4",
    "@tiptap/pm@>=2.11.5 <4",
    "@tiptap/starter-kit@>=2.11.5 <4",
    "@tiptap/core@>=2.11.5 <4",
    "@tiptap/extension-link@>=2.11.5 <4",
    "@tiptap/extension-underline@>=2.11.5 <4",
    "@tiptap/extension-code-block-lowlight@>=2.11.5 <4",
    "@tiptap/extension-placeholder@>=2.11.5 <4",
    "@tiptap/extension-text-align@>=2.11.5 <4",
    "@tiptap/extension-task-list@>=2.11.5 <4",
    "@tiptap/extension-task-item@>=2.11.5 <4",
    "@tiptap/extension-image@>=2.11.5 <4",
    "@tiptap/extension-table@>=2.11.5 <4",
    "@tiptap/extension-table-row@>=2.11.5 <4",
    "@tiptap/extension-table-cell@>=2.11.5 <4",
    "@tiptap/extension-table-header@>=2.11.5 <4",
    "@tiptap/extension-drag-handle@>=2.11.5 <4",
    "@tiptap/extension-drag-handle-react@>=2.11.5 <4",
    "@tiptap/suggestion@>=2.11.5 <4",
    "@base-ui/react@^1.0.0",
    "@floating-ui/dom@^1.6.0",
    "lowlight@^3.3.0",
    "class-variance-authority@^0.7.1",
    "clsx@^2.1.1",
    "tailwind-merge@^3.0.0",
  ],
  "custom-controls": [
    "@rtecn/editor@latest",
    "lucide-react@^0.546.0",
  ],
};

function buildItem(name, title, desc, files, dependencies, registryDependencies) {
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:component",
    title,
    description: desc,
    dependencies,
    files,
  };
  if (registryDependencies) item.registryDependencies = registryDependencies;
  return item;
}

function catalogItem(name, title, desc, depsList, fileList) {
  return {
    name,
    type: "registry:component",
    title,
    description: desc,
    dependencies: depsList,
    files: fileList.map((f) => ({ path: f.path, type: f.type })),
  };
}

const outDir = resolve(root, "apps", "web", "public", "r");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Write individual item JSON files (with content)
writeFileSync(
  resolve(outDir, "editor.json"),
  JSON.stringify(buildItem("editor", "Rich Text Editor", "A toolbar-style rich text editor built on Tiptap with shadcn/ui tokens.", editorFiles, deps.editor), null, 2),
);
writeFileSync(
  resolve(outDir, "block-editor.json"),
  JSON.stringify(buildItem("block-editor", "Block Editor", "A Notion-style block editor built on Tiptap with shadcn/ui tokens.", blockEditorFiles, deps["block-editor"]), null, 2),
);
// writeFileSync(
//   resolve(outDir, "custom-controls.json"),
//   JSON.stringify(buildItem("custom-controls", "Custom Toolbar Controls", "Ready-to-use custom toolbar controls for the Rich Text Editor.", customControlFiles, deps["custom-controls"], customControlRegistryDeps), null, 2),
// );

// Write catalog JSON (metadata only, no file content)
const catalog = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "rtecn",
  homepage: "https://rtecn.space",
  items: [
    catalogItem("editor", "Rich Text Editor", "A toolbar-style rich text editor built on Tiptap with shadcn/ui tokens.", deps.editor, editorFiles),
    catalogItem("block-editor", "Block Editor", "A Notion-style block editor built on Tiptap with shadcn/ui tokens.", deps["block-editor"], blockEditorFiles),
    // catalogItem("custom-controls", "Custom Toolbar Controls", "Ready-to-use custom toolbar controls for the Rich Text Editor.", deps["custom-controls"], customControlFiles),
  ],
};
writeFileSync(resolve(outDir, "registry.json"), JSON.stringify(catalog, null, 2));

console.log("Built registry:");
console.log("  apps/web/public/r/registry.json");
console.log("  apps/web/public/r/editor.json");
console.log("  apps/web/public/r/block-editor.json");
// console.log("  apps/web/public/r/custom-controls.json");
