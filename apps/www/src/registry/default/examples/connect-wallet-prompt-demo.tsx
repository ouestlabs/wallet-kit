"use client";

import { ConnectWalletPrompt } from "@/registry/default/ui/wallet/connect";

export default function ConnectWalletPromptDemo() {
  return (
    <div className="flex items-center justify-center">
      <ConnectWalletPrompt className="w-full" />
    </div>
  );
}
