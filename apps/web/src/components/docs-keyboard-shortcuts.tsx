"use client";

import { useRouter } from "next/navigation";
import { addTransitionType, startTransition } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const DocsKeyboardShortcuts = ({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) => {
  const router = useRouter();

  const navigate = (href: string | null, direction: "previous" | "next") => {
    if (href) {
      startTransition(() => {
        addTransitionType(direction === "next" ? "nav-forward" : "nav-back");
        router.push(href);
      });
    }
  };

  useHotkeys("ArrowRight", () => navigate(next, "next"), {
    preventDefault: true,
  });

  useHotkeys("ArrowLeft", () => navigate(previous, "previous"), {
    preventDefault: true,
  });

  return null;
};
