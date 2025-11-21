"use client";

import type { UiWallet, UiWalletAccount } from "@wallet-standard/react";
import { createContext } from "react";
import type { Network } from "@/registry/default/lib/chains/network";

type WalletNetworkContextValue = {
  network: Network;
  networks: Network[];
  setNetwork(networkId: Network["id"]): void;
};

const WalletNetworkContext = createContext<WalletNetworkContextValue>(
  {} as WalletNetworkContextValue
);

type WalletAccountInfo = {
  account: UiWalletAccount;
  accountKeys: string[];
  network: Network;
  wallet: UiWallet | undefined;
};

interface WalletAccountState extends Omit<WalletAccountInfo, "account"> {
  account: UiWalletAccount | undefined;
  setAccount: React.Dispatch<React.SetStateAction<UiWalletAccount | undefined>>;
}

const WalletAccountContext = createContext<WalletAccountState>(
  {} as WalletAccountState
);

type WalletUiContextValue<TClient = unknown> = {
  account?: UiWalletAccount;
  accountKeys: string[];
  client?: TClient;
  connect: (wallet: UiWalletAccount) => void;
  connected: boolean;
  copy: () => void;
  disconnect: () => void;
  isModalOpen: boolean;
  network: Network;
  setIsModalOpen: (open: boolean) => void;
  wallet?: UiWallet;
  wallets: UiWallet[];
};

type WalletUiContextProviderProps<TClient = unknown> = {
  children: React.ReactNode;
  client?: TClient;
};

const WalletUiContext = createContext<WalletUiContextValue<unknown>>(
  {} as WalletUiContextValue<unknown>
);

export {
  WalletNetworkContext,
  WalletAccountContext,
  WalletUiContext,
  type WalletNetworkContextValue,
  type WalletAccountState,
  type WalletUiContextValue,
  type WalletUiContextProviderProps,
};
