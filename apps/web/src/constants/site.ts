export const FALLBACK_SITE_ORIGIN = "https://editorcn.vercel.app" as const;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3001";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    NAME: "Abdullah",
  },
  DESCRIPTION: {
    LONG: "Rich text editor components for the shadcn/ui ecosystem.",
    SHORT: "Rich text editors for shadcn/ui",
  },
  NAME: "editorcn",
  OG_IMAGE: `${baseUrl}/og`,
  REGISTRY: "@editorcn",
  URL: baseUrl,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};
