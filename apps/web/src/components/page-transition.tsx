"use client";

import { type ReactNode, useCallback, useLayoutEffect, useRef } from "react";

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!document.startViewTransition) return;
    document.startViewTransition(() => {});
  }, []);

  return <div ref={ref}>{children}</div>;
};
