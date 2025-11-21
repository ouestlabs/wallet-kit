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
    <section className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex flex-col gap-6">
        <PageHeader className="relative">
          <PageHeaderHeading className="max-w-4xl! text-7xl!">
            <span className="flex items-baseline gap-2 font-serif sm:gap-3">
              <span className="font-bold leading-[0.95] tracking-[-0.03em]">
                Wallet
              </span>
              <span className="tracking-[-0.02em] opacity-90">Kit.</span>
            </span>
          </PageHeaderHeading>
          <PageHeaderDescription>
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
