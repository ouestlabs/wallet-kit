import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-wallet",
    type: "registry:hook",
    dependencies: ["@wallet-standard/react"],
    registryDependencies: [
      "@wallet-kit/context",
      "@wallet-kit/network",
      "@wallet-kit/storage",
    ],
    files: [
      {
        path: "hooks/use-wallet.ts",
        type: "registry:hook",
      },
    ],
  },
];
