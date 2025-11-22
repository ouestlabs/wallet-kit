import Link from "next/link";
import { memo } from "react";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layouts/global/headers/page";
import { Button } from "@/registry/default/ui/button";

export const Hero = memo(function _Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 overflow-hidden py-16 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--ring) 1px, transparent 1px),
              linear-gradient(90deg, var(--ring) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.05,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--sidebar))",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col gap-6">
        <PageHeader className="relative">
          <PageHeaderHeading className="max-w-4xl! text-7xl!">
            <span className="flex items-baseline gap-2 font-serif sm:gap-3">
              <span className="font-bold text-foreground leading-[0.95] tracking-[-0.03em]">
                Wallet
              </span>
              <span className="text-foreground/90 tracking-[-0.02em]">
                Kit.
              </span>
            </span>
          </PageHeaderHeading>
          <PageHeaderDescription className="text-muted-foreground">
            A set of accessible and composable Wallet UI components. Built on
            top of shadcn/ui, it's designed for you to copy, paste, and own.
          </PageHeaderDescription>
          <PageActions>
            <Button asChild size="sm">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/docs/components">View Components</Link>
            </Button>
          </PageActions>
        </PageHeader>
      </div>
    </section>
  );
});
