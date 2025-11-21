import type { Registry } from "shadcn/schema";
import { examples } from "./registry-examples";

const exampleNames = [
  "connect-wallet-demo",
  "connect-wallet-prompt-demo",
  "wallet-menu-demo",
  "network-select-demo",
  "wallet-list-demo",
  "wallet-icon-demo",
  "wallet-error-demo",
  "wallet-onboarding-demo",
  "wallet-balance-demo",
  "solana-client-demo",
] as const;

const customParticles: Registry["items"] = [];

const particlesFromExamples: Registry["items"] = exampleNames.map((name) => {
  const example = examples.find((e) => e.name === name);
  if (!example) {
    throw new Error(`Example ${name} not found in registry-examples`);
  }

  return {
    ...example,
    type: "registry:block",
    files: example.files?.map((file) => ({
      ...file,
      type: "registry:block",
    })),
  };
});

export const particles: Registry["items"] = [
  ...particlesFromExamples,
  ...customParticles,
];
