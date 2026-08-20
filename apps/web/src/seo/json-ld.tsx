import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

const JsonLdScript = ({ data }: { data: Record<string, unknown> }) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    type="application/ld+json"
  />
);

export const BreadcrumbJsonLd = ({
  items,
}: {
  items: { name: string; path: string }[];
}) => (
  <JsonLdScript
    data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        item: `${SITE.URL}${item.path.startsWith(ROUTES.HOME) ? item.path : `${ROUTES.HOME}${item.path}`}`,
        name: item.name,
        position: index + 1,
      })),
    }}
  />
);

export const WebSiteJsonLd = () => (
  <JsonLdScript
    data={{
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.NAME,
      url: SITE.URL,
      description: SITE.DESCRIPTION.LONG,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.URL}/docs?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    }}
  />
);

export const SoftwareApplicationJsonLd = () => (
  <JsonLdScript
    data={{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.NAME,
      url: SITE.URL,
      description: SITE.DESCRIPTION.LONG,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    }}
  />
);
