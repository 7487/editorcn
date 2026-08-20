"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RegistryAddButtonProps {
  registry: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
}

export const RegistryAddButton = ({
  registry,
  className,
  variant = "ghost",
  size = "sm",
}: RegistryAddButtonProps) => {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn("gap-1.5", className)}
    >
      <a
        href={`https://www.npmjs.com/package/${registry.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink className="size-3.5" />
        <span className="hidden sm:inline">npm</span>
      </a>
    </Button>
  );
};