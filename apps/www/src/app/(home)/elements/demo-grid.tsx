"use client";

import ConnectWalletDemo from "@/registry/default/examples/connect-wallet-demo";
import ConnectWalletPromptDemo from "@/registry/default/examples/connect-wallet-prompt-demo";
import NetworkSelectDemo from "@/registry/default/examples/network-select-demo";
import SolanaClientDemo from "@/registry/default/examples/solana-client-demo";
import WalletBalanceDemo from "@/registry/default/examples/wallet-balance-demo";
import WalletErrorDemo from "@/registry/default/examples/wallet-error-demo";
import WalletIconDemo from "@/registry/default/examples/wallet-icon-demo";
import WalletListDemo from "@/registry/default/examples/wallet-list-demo";
import WalletMenuDemo from "@/registry/default/examples/wallet-menu-demo";
import WalletOnboardingDemo from "@/registry/default/examples/wallet-onboarding-demo";

export function DemoGrid() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="flex items-center justify-center rounded-lg border p-4">
        <WalletMenuDemo />
      </div>
      <div className="flex items-center justify-center rounded-lg border p-4">
        <ConnectWalletDemo />
      </div>

      <div className="w-full rounded-lg border p-4">
        <WalletOnboardingDemo />
      </div>
      <div className="flex items-center justify-center">
        <ConnectWalletPromptDemo />
      </div>

      <div className="flex w-full items-center justify-center rounded-lg border p-4 lg:col-span-2 lg:row-span-3">
        <SolanaClientDemo />
      </div>
      <div className="w-full">
        <NetworkSelectDemo />
      </div>

      <div className="flex items-center justify-center rounded-lg border p-4">
        <WalletIconDemo />
      </div>

      <div className="flex items-center justify-center rounded-lg border p-4">
        <WalletBalanceDemo />
      </div>

      <div className="flex w-full items-center justify-center rounded-lg border p-4">
        <WalletErrorDemo />
      </div>

      <div className="w-full rounded-lg border p-4">
        <WalletListDemo />
      </div>
    </div>
  );
}
