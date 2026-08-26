import type {
  Node as PageTreeNode,
  Root as PageTreeRoot,
} from "fumadocs-core/page-tree";

import { EXCLUDED_SECTIONS, isComponentsFolder } from "@/lib/docs";

export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>;
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>;

export interface TreeGroup {
  label: string;
  pages: PageTreePage[];
}

export const getPagesFromFolder = (folder: PageTreeFolder): PageTreePage[] =>
  folder.children.filter(
    (child): child is PageTreePage => child.type === "page"
  );

export const getAllPagesFromFolder = (
  folder: PageTreeFolder
): PageTreePage[] => {
  const pages: PageTreePage[] = [];

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child);
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child));
    }
  }

  return pages;
};

export const getTreeGroups = (tree: PageTreeRoot): TreeGroup[] => {
  const groups: TreeGroup[] = [];

  for (const item of tree.children) {
    if (item.type !== "folder") {
      continue;
    }
    if (EXCLUDED_SECTIONS.has(item.$id ?? "")) {
      continue;
    }

    const pages = isComponentsFolder(item)
      ? getAllPagesFromFolder(item).filter(
          (page) =>
            !page.url.endsWith("/editor") && !page.url.endsWith("/block-editor")
        )
      : getPagesFromFolder(item);

    if (pages.length > 0) {
      groups.push({
        label: typeof item.name === "string" ? item.name : String(item.name),
        pages,
      });
    }
  }

  return groups;
};
