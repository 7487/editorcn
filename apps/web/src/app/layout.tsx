import type { Metadata } from "next";
import { SoundProvider } from "@web-kits/audio/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { META_THEME_COLORS } from "@/constants/site";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SoftwareApplicationJsonLd, WebSiteJsonLd } from "@/seo/json-ld";

import "@/index.css";

export const metadata: Metadata = {
  title: {
    default: "Editorcn - Rich Text Editors for shadcn/ui",
    template: "%s | Editorcn",
  },
  description: "Rich text editor components for the shadcn/ui ecosystem. Open-source, customizable, and ready to use.",
  keywords: ["shadcn", "editor", "rich text", "tiptap", "react", "components"],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <WebSiteJsonLd />
      <SoftwareApplicationJsonLd />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
        }}
      />
      <meta name="theme-color" content={META_THEME_COLORS.light} />
    </head>
    <body
      className={cn(
        "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:--spacing(14)] [--header-height:--spacing(14)] xl:[--footer-height:--spacing(24)]",
        fontVariables
      )}
    >
      <ThemeProvider>
        <SoundProvider>
          {children}
          <Toaster position="top-center" />
        </SoundProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
