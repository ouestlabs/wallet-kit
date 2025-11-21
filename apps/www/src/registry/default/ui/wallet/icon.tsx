"use client";

import type { UiWallet } from "@wallet-standard/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/default/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

const walletIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm",
  {
    variants: {
      size: {
        default: "size-8",
        sm: "size-6",
        lg: "size-10",
        xl: "size-12",
        "2xl": "size-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface WalletIconProps
  extends React.ComponentProps<typeof Avatar>,
    VariantProps<typeof walletIconVariants> {
  wallet?: Pick<UiWallet, "icon" | "name">;
}

function WalletIcon({ wallet, size, className, ...props }: WalletIconProps) {
  return (
    <Avatar className={cn(walletIconVariants({ size }), className)} {...props}>
      {wallet?.icon && (
        <AvatarImage
          alt={wallet.name || "Wallet"}
          className="rounded-sm"
          src={wallet.icon}
        />
      )}
      <AvatarFallback>
        {(wallet?.name?.[0] || "W").toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export { WalletIcon, walletIconVariants };
