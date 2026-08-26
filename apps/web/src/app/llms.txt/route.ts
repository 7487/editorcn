import { llms } from "fumadocs-core/source";

import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { source } from "@/lib/source";

export const revalidate = false;

const documentationIndex = (base: string) =>
  llms(source)
    .index()
    .replaceAll(
      /\]\((\/docs(?:\/[^)#\s]+)?)(#[^)]+)?\)/g,
      (_, pathname, hash = "") => `](${base}${pathname}.md${hash})`
    )
    .trim();

const docsIndex = (origin: string) => {
  const base = origin.replace(/\/$/, "");

  return `# ${SITE.NAME}

> ${SITE.DESCRIPTION.LONG} Use this index to discover the available documentation pages and markdown mirrors before browsing.

${documentationIndex(base)}

## Machine-readable Resources

- [Full documentation](${base}${ROUTES.LLMS_FULL})
- [Homepage markdown](${base}${ROUTES.LLMS_MD}/content.md)
- [OpenAPI description](${base}${ROUTES.OPENAPI})
- [API catalog](${base}${ROUTES.API_CATALOG})
- [Agent skill](${base}${ROUTES.AGENT_SKILLS_SITE_SKILL})
- [shadcn MCP server documentation](${LINK.SHADCN_MCP_DOCS})
`;
};

export const GET = (request: Request) =>
  new Response(docsIndex(new URL(request.url).origin), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
