"use client";

import { Github } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";

export const NavItemGithub = () => (
  <Button variant="ghost" size="icon" className="size-8" asChild>
    <Link href={LINK.GITHUB} target="_blank" rel="noreferrer">
      <Github className="size-4" />
      <span className="sr-only">GitHub</span>
    </Link>
  </Button>
);
