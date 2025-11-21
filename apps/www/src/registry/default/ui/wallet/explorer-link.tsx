"use client";

import { ExternalLink } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";

interface ExplorerLinkProps extends React.ComponentProps<typeof Button> {
  url: string;
  label: string;
  showIcon?: boolean;
}

export function ExplorerLink({
  url,
  label = "View in Explorer",
  className,
  showIcon = true,
  variant = "link",
  size = "sm",
  ...props
}: ExplorerLinkProps) {
  return (
    <Button
      asChild
      className={cn("h-auto px-0", className)}
      size={size}
      variant={variant}
      {...props}
    >
      <a href={url} rel="noopener noreferrer" target="_blank">
        {label}
        {showIcon && <ExternalLink className="h-3 w-3" />}
      </a>
    </Button>
  );
}
