import {
  type ClusterUrl,
  LAMPORTS_PER_SOL,
  type SolanaClusterMoniker,
} from "gill";
import {
  defineNetwork,
  type Network,
} from "@/registry/default/lib/chains/network";

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
function getSolanaClusterMoniker(
  networkId: SolanaNetworkId
): SolanaClusterMoniker {
  if (!networkId.startsWith("solana:")) {
    throw new Error(`Invalid network id: ${networkId}`);
  }
  return networkId.replace("solana:", "") as SolanaClusterMoniker;
}

export {
  formatSol,
  createSolanaDevnet,
  createSolanaMainnet,
  createSolanaTestnet,
  createSolanaLocalnet,
  getSolanaClusterMoniker,
  type SolanaNetwork,
  type SolanaNetworkId,
};
