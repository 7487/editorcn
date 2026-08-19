"use client";

import Link from "next/link";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const DocsNavLink = ({
  href,
  children,
  className,
  tooltip,
  transitionTypes,
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  tooltip?: { title: string; icon: React.ReactNode };
  transitionTypes?: string[];
}) => {
  const link = (
    <Button
      variant="secondary"
      size={size}
      className={cn("shadow-none", className)}
      asChild
      {...props}
    >
      <Link href={href} transitionTypes={transitionTypes}>
        {transitionTypes?.includes("nav-back") && <ArrowLeftIcon />}
        {children}
        {transitionTypes?.includes("nav-forward") && <ArrowRightIcon />}
      </Link>
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent className="pr-2 pl-3">
          <div className="flex items-center gap-3">
            {tooltip.title}
            {tooltip.icon}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};
