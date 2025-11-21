import type { Registry } from "shadcn/schema";

export const lib: Registry["items"] = [
  {
    name: "ellipsify",
    type: "registry:lib",
    files: [
      {
        path: "lib/ellipsify.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "network",
    type: "registry:lib",
    files: [
      {
        path: "lib/chains/network.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "context",
    type: "registry:lib",
    files: [
      {
        path: "lib/chains/context.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "storage",
    type: "registry:lib",
    dependencies: ["@nanostores/react", "nanostores"],
    files: [
      {
        path: "lib/chains/storage.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "solana",
    type: "registry:lib",
    dependencies: ["gill"],
    registryDependencies: ["@wallet-kit/network"],
    files: [
      {
        path: "lib/chains/solana/index.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "solana-adapter",
    type: "registry:lib",
    dependencies: ["gill", "react", "@gillsdk/react", "@tanstack/react-query"],
    registryDependencies: [
      "@wallet-kit/context",
      "@wallet-kit/network",
      "@wallet-kit/use-wallet",
    ],
    files: [
      {
        path: "lib/chains/solana/adapter.tsx",
        type: "registry:lib",
      },
    ],
  },
];
