import { LINK } from "@/constants/links";

export const SiteFooter = () => (
  <footer
    className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent dark:bg-transparent"
    style={{ viewTransitionName: "site-footer" }}
  >
    <div className="container-wrapper px-4 xl:px-6">
      <div className="flex h-(--footer-height) items-center justify-between">
        <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
          Built by{" "}
          <a
            href={LINK.PORTFOLIO}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Abdullah
          </a>
          . The source code is available on{" "}
          <a
            href={LINK.GITHUB}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </div>
  </footer>
);
