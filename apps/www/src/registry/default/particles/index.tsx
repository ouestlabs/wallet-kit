import type React from "react";
import ConnectWalletDemo from "../examples/connect-wallet-demo";
import ConnectWalletPromptDemo from "../examples/connect-wallet-prompt-demo";
import NetworkSelectDemo from "../examples/network-select-demo";
import SolanaClientDemo from "../examples/solana-client-demo";
import WalletBalanceDemo from "../examples/wallet-balance-demo";
import WalletErrorDemo from "../examples/wallet-error-demo";
import WalletIconDemo from "../examples/wallet-icon-demo";
import WalletListDemo from "../examples/wallet-list-demo";
import WalletMenuDemo from "../examples/wallet-menu-demo";
import WalletOnboardingDemo from "../examples/wallet-onboarding-demo";

type ParticleComponent = React.ComponentType;

type ParticleItem = {
  id: string;
  component: ParticleComponent;
  fullWidth?: boolean;
  className?: string;
  category?: string[];
};

export const particles: ParticleItem[] = [
  {
    id: "solana-client-demo",
    component: SolanaClientDemo,
    category: ["wallet", "solana"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "connect-wallet-demo",
    component: ConnectWalletDemo,
    category: ["wallet", "connect"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "connect-wallet-prompt-demo",
    component: ConnectWalletPromptDemo,
    category: ["wallet", "connect"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "wallet-menu-demo",
    component: WalletMenuDemo,
    category: ["wallet", "menu"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "network-select-demo",
    component: NetworkSelectDemo,
    category: ["wallet", "network"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "wallet-list-demo",
    component: WalletListDemo,
    category: ["wallet", "list"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "wallet-icon-demo",
    component: WalletIconDemo,
    category: ["wallet", "icon"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "wallet-error-demo",
    component: WalletErrorDemo,
    category: ["wallet", "error"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "wallet-onboarding-demo",
    component: WalletOnboardingDemo,
    category: ["wallet", "onboarding"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
  {
    id: "wallet-balance-demo",
    component: WalletBalanceDemo,
    category: ["wallet", "balance"],
    className: "**:data-[slot=particle-wrapper]:w-full",
  },
];
