"use client";

import { useStore } from "@nanostores/react";
import {
  getUiWalletAccountStorageKey,
  type UiWallet,
  type UiWalletAccount,
  uiWalletAccountBelongsToUiWallet,
  uiWalletAccountsAreSame,
  useWallets,
} from "@wallet-standard/react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useAvailableWallets,
  useWalletAccount,
  useWalletNetwork,
} from "@/hooks/use-wallet";
import {
  WalletAccountContext,
  WalletNetworkContext,
  type WalletNetworkContextValue,
  WalletUiContext,
  type WalletUiContextProviderProps,
  type WalletUiContextValue,
} from "@/lib/chains/context";
import type { Network } from "@/lib/chains/network";
import {
  createStorageAccount,
  createStorageNetwork,
  type StorageAccount,
  type StorageNetwork,
} from "@/lib/chains/storage";

type WalletNetworkContextProviderProps = {
  children: ReactNode;
  networks: Network[];
  defaultNetworkId?: Network["id"];
  storage: StorageNetwork;
  onNetworkChange?: (networkId: Network["id"]) => void;
};

function WalletNetworkContextProvider({
  children,
  networks,
  defaultNetworkId,
  storage,
  onNetworkChange,
}: WalletNetworkContextProviderProps) {
  const storedNetworkId = useStore(storage.value);

  const networkFound = networks.find((n) => n.id === storedNetworkId);
  const firstNetwork = networks[0];
  const activeNetwork =
    networkFound ??
    networks.find((n) => n.id === defaultNetworkId) ??
    firstNetwork;

  if (!activeNetwork && networks.length > 0) {
    console.warn("No active network found and networks list is not empty.");
  }

  const value: WalletNetworkContextValue = {
    network: activeNetwork ?? { id: ":", label: "", url: "" },
    networks,
    setNetwork(networkId) {
      const network = networks.find((n) => n.id === networkId);
      if (!network) {
        throw new Error(`Network ${networkId} not found`);
      }
      storage.set(networkId);
      onNetworkChange?.(networkId);
    },
  };

  return (
    <WalletNetworkContext.Provider value={value}>
      {children}
    </WalletNetworkContext.Provider>
  );
}

let wasSetterInvoked = false;

function getSavedWalletAccount(
  wallets: readonly UiWallet[],
  savedWalletNameAndAddress?: string
): UiWalletAccount | undefined {
  if (wasSetterInvoked) {
    // After the user makes an explicit choice of wallet, stop trying to auto-select the
    // saved wallet, if and when it appears.
    return;
  }
  if (
    !savedWalletNameAndAddress ||
    typeof savedWalletNameAndAddress !== "string"
  ) {
    return;
  }
  const [savedWalletName, savedAccountAddress] =
    savedWalletNameAndAddress.split(":");
  if (!(savedWalletName && savedAccountAddress)) {
    return;
  }
  const wallet = wallets.find((w) => w.name === savedWalletName);
  if (!wallet) {
    return;
  }
  return wallet.accounts.find((a) => a.address === savedAccountAddress);
}

function findWalletAccount(
  account: UiWalletAccount,
  wallets: readonly UiWallet[]
): UiWalletAccount | undefined {
  for (const uiWallet of wallets) {
    for (const uiWalletAccount of uiWallet.accounts) {
      if (uiWalletAccountsAreSame(account, uiWalletAccount)) {
        return uiWalletAccount;
      }
    }
    if (
      uiWalletAccountBelongsToUiWallet(account, uiWallet) &&
      uiWallet.accounts[0]
    ) {
      return uiWallet.accounts[0];
    }
  }
  return;
}

function WalletAccountContextProvider({
  children,
  storage = createStorageAccount(),
}: {
  children: React.ReactNode;
  storage?: StorageAccount;
}) {
  const { network } = useWalletNetwork();
  const wallets = useWallets();
  const accountId = useStore(storage.value);
  const [account, setAccountInternal] = useState<UiWalletAccount | undefined>(
    () => getSavedWalletAccount(wallets, accountId)
  );

  const setAccount = useCallback(
    (setStateAction: React.SetStateAction<UiWalletAccount | undefined>) => {
      setAccountInternal((prevAccount) => {
        wasSetterInvoked = true;
        return typeof setStateAction === "function"
          ? setStateAction(prevAccount)
          : setStateAction;
      });
    },
    []
  );

  useEffect(() => {
    if (wasSetterInvoked) {
      const accountKey = account
        ? getUiWalletAccountStorageKey(account)
        : undefined;
      storage.set(accountKey ? accountKey : undefined);
    }
  }, [account, storage]);

  useEffect(() => {
    const savedWalletAccount = getSavedWalletAccount(wallets, accountId);
    if (savedWalletAccount && !account) {
      setAccountInternal(savedWalletAccount);
    }
  }, [accountId, wallets, account]);

  const walletAccount = useMemo(() => {
    if (!account) {
      return;
    }
    return findWalletAccount(account, wallets);
  }, [account, wallets]);

  useEffect(() => {
    if (account && !walletAccount && !wasSetterInvoked) {
      setTimeout(() => {
        setAccountInternal(undefined);
      }, 0);
    }
  }, [account, walletAccount]);

  const wallet = useMemo(() => {
    if (!walletAccount) {
      return;
    }
    for (const uiWallet of wallets) {
      for (const uiWalletAccount of uiWallet.accounts) {
        if (uiWalletAccountsAreSame(walletAccount, uiWalletAccount)) {
          return uiWallet;
        }
      }
      if (
        uiWalletAccountBelongsToUiWallet(walletAccount, uiWallet) &&
        uiWallet.accounts[0]
      ) {
        // If the selected account belongs to this connected wallet, at least, then
        // select one of its accounts.
        return uiWallet;
      }
    }
  }, [walletAccount, wallets]);

  const accountKeys = useMemo(() => {
    if (!account) {
      return [];
    }
    return [network.id, getUiWalletAccountStorageKey(account)].filter(Boolean);
  }, [account, network.id]);
  return (
    <WalletAccountContext.Provider
      value={useMemo(
        () => ({
          account: walletAccount,
          accountKeys,
          network,
          setAccount,
          wallet,
        }),
        [walletAccount, wallet, accountKeys, setAccount, network]
      )}
    >
      {children}
    </WalletAccountContext.Provider>
  );
}

function WalletUiContextProvider({
  children,
  client,
}: WalletUiContextProviderProps) {
  const { account, accountKeys, setAccount, wallet } = useWalletAccount();
  const { network } = useWalletNetwork();

  const chainNamespace = network?.id ? network.id.split(":")[0] : undefined;
  const chainPrefix = chainNamespace ? `${chainNamespace}:` : undefined;

  const wallets = useAvailableWallets(chainPrefix);
  const connected = Boolean(wallet && wallet?.accounts.length > 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function connect(walletAccount: UiWalletAccount) {
    setAccount(walletAccount);
    setIsModalOpen(false);
  }

  function disconnect() {
    setAccount(undefined);
  }

  function copy() {
    if (!account?.address) {
      return;
    }
    return async () => {
      if (
        typeof globalThis === "undefined" ||
        !globalThis.navigator ||
        !globalThis.navigator.clipboard ||
        !globalThis.navigator.clipboard.writeText
      ) {
        return;
      }
      await globalThis.navigator.clipboard.writeText(account.address);
    };
  }

  const value: WalletUiContextValue = {
    account,
    accountKeys,
    client,
    connect,
    connected,
    copy,
    disconnect,
    isModalOpen,
    setIsModalOpen,
    wallet,
    wallets,
  };

  return (
    <WalletUiContext.Provider value={value}>
      {children}
    </WalletUiContext.Provider>
  );
}

interface WalletConfig extends Omit<WalletUiContextProviderProps, "children"> {
  accountStorage?: StorageAccount;
  networkStorage?: StorageNetwork;
  networks: Network[];
  defaultNetworkId?: Network["id"];
  onNetworkChange?: (networkId: Network["id"]) => void;
}

function createWalletConfig(props: WalletConfig): WalletConfig {
  return { ...props };
}

function WalletProvider({
  children,
  config: {
    accountStorage,
    networkStorage,
    networks,
    defaultNetworkId,
    onNetworkChange,
    ...uiConfig
  },
}: {
  children: ReactNode;
  config: WalletConfig;
}) {
  return (
    <WalletNetworkContextProvider
      defaultNetworkId={defaultNetworkId}
      networks={networks}
      onNetworkChange={onNetworkChange}
      storage={networkStorage ?? createStorageNetwork()}
    >
      <WalletAccountContextProvider
        storage={accountStorage ?? createStorageAccount()}
      >
        <WalletUiContextProvider {...uiConfig}>
          {children}
        </WalletUiContextProvider>
      </WalletAccountContextProvider>
    </WalletNetworkContextProvider>
  );
}

export { WalletProvider, createWalletConfig };
