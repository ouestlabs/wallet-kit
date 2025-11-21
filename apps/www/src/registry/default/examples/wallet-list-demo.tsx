"use client";

import { useWallet } from "@/registry/default/hooks/use-wallet";
import { WalletList } from "@/registry/default/ui/wallet/list";

export default function WalletListDemo() {
  const { wallets } = useWallet();
  return <WalletList wallets={wallets} />;
}
