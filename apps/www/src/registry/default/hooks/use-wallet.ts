"use client";

import {
  type UiWallet,
  useConnect,
  useDisconnect,
  useWallets,
} from "@wallet-standard/react";
import { useContext, useEffect, useMemo } from "react";
import { toast } from "sonner";

import {
  WalletAccountContext,
  WalletNetworkContext,
  WalletUiContext,
  type WalletUiContextValue,
} from "@/registry/default/lib/chains/context";

function useWallet<TClient = unknown>() {
  return useContext(WalletUiContext) as WalletUiContextValue<TClient>;
}

function useWalletAccount() {
  return useContext(WalletAccountContext);
}

function useWalletNetwork() {
  return useContext(WalletNetworkContext);
}

function useAvailableWallets(chainPrefix?: string) {
  const readonlyWallets = useWallets();
  return useMemo(
    () =>
      readonlyWallets
        .filter(
          (wallet) =>
            !chainPrefix || wallet.chains.some((i) => i.startsWith(chainPrefix))
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [readonlyWallets, chainPrefix]
  );
}

function useWalletConnection({ wallet }: { wallet: UiWallet }) {
  const { connect: connectAccount } = useWallet();
  const { setAccount } = useWalletAccount();

  const [isConnecting, connect] = useConnect(wallet);
  const [isDisconnecting, disconnect] = useDisconnect(wallet);

  useEffect(() => {
    if (isDisconnecting) {
      setAccount(undefined);
    }
  }, [isDisconnecting, setAccount]);

  return {
    connect: async () => {
      const connectedAccount = await connect();
      if (!connectedAccount.length) {
        console.warn(`Connect to ${wallet.name} but there are no accounts.`);
        return connectedAccount;
      }
      // TODO: Support wallets with multiple accounts
      const first = connectedAccount[0];
      if (!first) {
        return connectedAccount;
      }
      setAccount(first);
      connectAccount(first);

      toast.success(`Connected to ${wallet.name} successfully`);
      return connectedAccount;
    },
    disconnect: async () => {
      await disconnect();
      toast.success(`Disconnected from ${wallet.name} successfully`);
    },
    isConnecting,
    isDisconnecting,
  };
}

export {
  useWallet,
  useWalletAccount,
  useWalletNetwork,
  useWalletConnection,
  useAvailableWallets,
};
