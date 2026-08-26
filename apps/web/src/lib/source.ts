import { docs } from "collections/server";
import type { InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const getPageMarkdownUrl = (page: InferPageType<typeof source>) => {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `/docs/content/${segments.join("/")}`,
  };
};
