import type { Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  {
    name: "connect-wallet-demo",
    description: "A simple connect wallet button example",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/connect",
      "@wallet-kit/solana",
    ],
    files: [
      { path: "examples/connect-wallet-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "connect-wallet-prompt-demo",
    description: "A prompt component that displays when no wallet is connected",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/connect",
      "@wallet-kit/solana",
    ],
    files: [
      {
        path: "examples/connect-wallet-prompt-demo.tsx",
        type: "registry:example",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "network-select-demo",
    description: "Network selection control with badge and dropdown",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/network-control",
      "@wallet-kit/solana",
    ],
    files: [
      { path: "examples/network-select-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "wallet-list-demo",
    description:
      "List of available wallets with connect and disconnect actions",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/list",
      "@wallet-kit/solana",
      "@wallet-kit/use-wallet",
    ],
    files: [
      { path: "examples/wallet-list-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "wallet-menu-demo",
    description: "Wallet dropdown menu with account info and actions",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/menu",
      "@wallet-kit/solana",
    ],
    files: [
      { path: "examples/wallet-menu-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "wallet-error-demo",
    description: "Wallet error dialog for displaying connection errors",
    type: "registry:example",
    dependencies: [],
    registryDependencies: ["@wallet-kit/error"],
    files: [
      { path: "examples/wallet-error-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "wallet-onboarding-demo",
    description: "Interactive wallet onboarding flow with step-by-step guide",
    type: "registry:example",
    dependencies: [],
    registryDependencies: ["@wallet-kit/onboarding"],
    files: [
      { path: "examples/wallet-onboarding-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "wallet-icon-demo",
    description: "Wallet icon component with different size variants",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/icon",
      "@wallet-kit/solana",
      "@wallet-kit/use-wallet",
    ],
    files: [
      { path: "examples/wallet-icon-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "wallet-balance-demo",
    description: "Display wallet balance with loading states and formatting",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/balance",
      "@wallet-kit/solana",
      "@wallet-kit/use-wallet",
    ],
    files: [
      { path: "examples/wallet-balance-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
  {
    name: "solana-client-demo",
    description:
      "Example using SolanaWalletProvider and useSolanaWallet hook to interact with Solana RPC",
    type: "registry:example",
    dependencies: [],
    registryDependencies: [
      "@wallet-kit/provider",
      "@wallet-kit/solana-adapter",
      "@wallet-kit/solana",
      "@wallet-kit/use-wallet",
    ],
    files: [
      { path: "examples/solana-client-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
];
