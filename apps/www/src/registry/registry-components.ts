import type { Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    name: "provider",
    type: "registry:component",
    dependencies: ["@wallet-standard/react", "@nanostores/react"],
    registryDependencies: [
      "@wallet-kit/context",
      "@wallet-kit/network",
      "@wallet-kit/storage",
      "@wallet-kit/use-wallet",
    ],
    files: [
      {
        path: "ui/wallet/provider.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "connect",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "@shadcn/button",
      "@shadcn/dialog",
      "@shadcn/item",
      "@shadcn/button-group",
      "@wallet-kit/provider",
      "@wallet-kit/list",
      "@wallet-kit/onboarding",
      "@wallet-kit/error",
      "@wallet-kit/icon",
      "@wallet-kit/ellipsify",
    ],
    files: [
      {
        path: "ui/wallet/connect.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "list",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "@shadcn/button",
      "@shadcn/spinner",
      "@shadcn/alert",
      "@shadcn/badge",
      "@wallet-kit/icon",
      "@wallet-kit/use-wallet",
    ],
    files: [
      {
        path: "ui/wallet/list.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "menu",
    type: "registry:component",
    dependencies: ["lucide-react", "sonner"],
    registryDependencies: [
      "@shadcn/button",
      "@shadcn/dropdown-menu",
      "@wallet-kit/connect",
      "@wallet-kit/error",
      "@wallet-kit/icon",
      "@wallet-kit/ellipsify",
      "@wallet-kit/use-wallet",
    ],
    files: [
      {
        path: "ui/wallet/menu.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "network-control",
    type: "registry:component",
    dependencies: [],
    registryDependencies: [
      "@shadcn/badge",
      "@wallet-kit/use-wallet",
      "@wallet-kit/network",
    ],
    files: [
      {
        path: "ui/wallet/network.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "error",
    type: "registry:component",
    dependencies: ["@wallet-standard/core"],
    registryDependencies: ["@shadcn/alert-dialog", "@shadcn/button"],
    files: [
      {
        path: "ui/wallet/error.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "onboarding",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: ["@shadcn/button"],
    files: [
      {
        path: "ui/wallet/onboarding.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "icon",
    type: "registry:component",
    dependencies: ["@wallet-standard/react", "class-variance-authority"],
    registryDependencies: ["@shadcn/avatar"],
    files: [
      {
        path: "ui/wallet/icon.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "explorer-link",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["@shadcn/button", "@wallet-kit/use-wallet"],
    files: [
      {
        path: "ui/wallet/explorer-link.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
  {
    name: "balance",
    type: "registry:component",
    dependencies: [],
    registryDependencies: ["@shadcn/skeleton", "@wallet-kit/use-wallet"],
    files: [
      {
        path: "ui/wallet/balance.tsx",
        type: "registry:component",
      },
    ],
    categories: ["wallet"],
  },
];
