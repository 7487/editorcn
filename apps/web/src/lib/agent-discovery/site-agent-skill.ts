import { createHash } from "node:crypto";

import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export const SITE_AGENT_SKILL_MD = `# ${SITE.NAME}

## Summary

Help users discover, inspect, and install rich text editor components built on Tiptap from this public shadcn registry and its documentation site.

## Registry

- Registry JSON: \`${ROUTES.REGISTRY}\`
- Docs: ${ROUTES.DOCS}

## MCP

This site is a shadcn-compatible registry. For MCP workflows, use the maintained shadcn MCP server documentation: ${LINK.SHADCN_MCP_DOCS}

## Install

\`\`\`bash
npx shadcn@latest add ${SITE.URL}/r/your-component.json
\`\`\`

Prefer following the on-site getting started guide: ${ROUTES.DOCS_GETTING_STARTED}
`;

export const siteAgentSkillDigest = (): string => {
  const hex = createHash("sha256")
    .update(SITE_AGENT_SKILL_MD, "utf-8")
    .digest("hex");

  return `sha256:${hex}`;
};
