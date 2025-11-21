"use client";

import { useWalletAccount } from "@/registry/default/hooks/use-wallet";
import { WalletIcon } from "@/registry/default/ui/wallet/icon";

export default function WalletIconDemo() {
  const { wallet } = useWalletAccount();

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <WalletIcon size="sm" wallet={wallet} />
        <span className="text-muted-foreground text-xs">Size sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WalletIcon size="default" wallet={wallet} />
        <span className="text-muted-foreground text-xs">Size default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WalletIcon size="lg" wallet={wallet} />
        <span className="text-muted-foreground text-xs">Size lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WalletIcon size="xl" wallet={wallet} />
        <span className="text-muted-foreground text-xs">Size xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <WalletIcon size="2xl" wallet={wallet} />
        <span className="text-muted-foreground text-xs">Size 2xl</span>
      </div>
    </div>
  );
}
