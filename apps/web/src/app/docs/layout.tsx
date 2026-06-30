"use client";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      themeSwitch={{
        enabled: true,
        component: (
          <div className="ml-auto">
            <ModeToggle />
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
