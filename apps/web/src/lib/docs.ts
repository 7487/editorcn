import { ROUTES } from "@/constants/routes";
import type { PageTreeFolder } from "@/lib/page-tree";
import { formatLabelFromSlug } from "@/lib/utils";

export const DOCS_DIR = `content${ROUTES.DOCS}`;

export const EXCLUDED_SECTIONS = new Set(["(root)"]);

export const isComponentsFolder = (folder: PageTreeFolder) =>
  folder.$id === "components" || folder.name === "Components";

const TITLE_OVERRIDES: Record<string, string> = {
  json: "JSON",
};

export const formatTitleFromSlug = (slug: string): string =>
  TITLE_OVERRIDES[slug] ?? formatLabelFromSlug(slug);

export const PAGES_NEW: string[] = [ROUTES.DOCS_CHANGELOG];

export const homeContentRoute = `${ROUTES.LLMS_MD}/content.md`;
