export const FALLBACK_SITE_ORIGIN = "https://rtecn.space" as const;

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
  NAME: "Rtecn",
  OG_IMAGE: `${baseUrl}/og`,
  URL: baseUrl,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
  light: "#ffffff",
};
