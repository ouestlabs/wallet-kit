import { type ClusterUrl, LAMPORTS_PER_SOL } from "gill";
import { defineNetwork, type Network } from "@/lib/chains/network";

type SolanaNetworkId = `solana:${string}`;

interface SolanaNetwork extends Network {
  id: SolanaNetworkId;
  url: ClusterUrl;
}

const createSolanaMainnet = defineNetwork<SolanaNetwork>({
  id: "solana:mainnet",
  label: "Mainnet",
  url: "mainnet",
});

const createSolanaDevnet = defineNetwork<SolanaNetwork>({
  id: "solana:devnet",
  label: "Devnet",
  url: "devnet",
});

const createSolanaTestnet = defineNetwork<SolanaNetwork>({
  id: "solana:testnet",
  label: "Testnet",
  url: "testnet",
});

const createSolanaLocalnet = defineNetwork<SolanaNetwork>({
  id: "solana:localnet",
  label: "Localnet",
  url: "localnet",
});

type FormatSolArgs = {
  balance: bigint;
  locale?: Intl.LocalesArgument;
  options?: Intl.NumberFormatOptions;
};

function formatSol({
  balance,
  locale = "en-US",
  options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  },
}: FormatSolArgs) {
  if (!balance) {
    return "0";
  }
  return Intl.NumberFormat(locale, {
    ...options,
  }).format(Number(balance) / LAMPORTS_PER_SOL);
}
export {
  formatSol,
  createSolanaDevnet,
  createSolanaLocalnet,
  createSolanaMainnet,
  createSolanaTestnet,
  type SolanaNetwork,
  type SolanaNetworkId,
};
