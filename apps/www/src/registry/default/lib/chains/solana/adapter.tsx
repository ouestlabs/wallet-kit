"use client";

import {
  GILL_HOOK_CLIENT_KEY,
  SolanaProvider,
  useAccount as useGillAccount,
  useBalance as useGillBalance,
  useLatestBlockhash as useGillLatestBlockhash,
  useProgramAccounts as useGillProgramAccounts,
  useSignatureStatuses as useGillSignatureStatuses,
  useSignaturesForAddress as useGillSignaturesForAddress,
  useSolanaClient as useGillSolanaClient,
  useTokenAccount as useGillTokenAccount,
  useTokenMint as useGillTokenMint,
  useUpdateSolanaClient as useGillUpdateSolanaClient,
} from "@gillsdk/react";
import {
  QueryClient,
  type QueryClient as QueryClientType,
  useQueryClient,
} from "@tanstack/react-query";
import {
  type Address,
  type Commitment,
  createSolanaClient,
  type SolanaClient,
  type SolanaClientUrlOrMoniker,
  type SolanaClusterMoniker,
} from "gill";
import { useContext, useMemo } from "react";
import {
  useWallet,
  useWalletAccount,
  useWalletNetwork,
} from "@/registry/default/hooks/use-wallet";
import {
  WalletUiContext,
  type WalletUiContextValue,
} from "@/registry/default/lib/chains/context";
import {
  getSolanaClusterMoniker,
  type SolanaNetworkId,
} from "@/registry/default/lib/chains/solana";

type SolanaWalletProviderProps = {
  children: React.ReactNode;
  url?: SolanaClientUrlOrMoniker;
  queryClient?: QueryClientType;
};

type SolanaNetworkInfo = {
  networkId: SolanaNetworkId;
  cluster: SolanaClusterMoniker;
};

function isSolanaNetwork(networkId: string): boolean {
  return networkId.startsWith("solana:");
}

function createSolanaClientFromNetwork(
  networkUrl: string,
  customUrl?: SolanaClientUrlOrMoniker
): SolanaClient {
  const urlOrMoniker = customUrl ?? networkUrl;
  return createSolanaClient({ urlOrMoniker });
}

function shouldInjectSolanaClient(
  existingClient: unknown,
  isSolana: boolean
): boolean {
  return isSolana && !existingClient;
}

function ensureSolanaQueryClient(
  existingClient: QueryClientType
): QueryClientType {
  const defaultQueryFn = existingClient.getDefaultOptions().queries?.queryFn;

  if (defaultQueryFn) {
    return existingClient;
  }

  const defaultOptions = existingClient.getDefaultOptions();

  return new QueryClient({
    ...defaultOptions,
    defaultOptions: {
      ...defaultOptions,
      queries: {
        ...defaultOptions.queries,
        queryFn: ({ queryKey }) => {
          if (queryKey[0] === GILL_HOOK_CLIENT_KEY) {
            throw new Error(
              "SolanaProvider must be present when using @gillsdk/react hooks"
            );
          }
          throw new Error(
            `No queryFn provided for query key: ${String(queryKey[0])}`
          );
        },
      },
    },
  });
}

function SolanaWalletProvider({
  children,
  url,
  queryClient: queryClientProp,
}: SolanaWalletProviderProps) {
  const existingContext = useContext(WalletUiContext);
  const { network } = useWalletNetwork();
  const queryClientFromContext = useQueryClient();

  const queryClient = useMemo(
    () => ensureSolanaQueryClient(queryClientProp ?? queryClientFromContext),
    [queryClientProp, queryClientFromContext]
  );

  const isSolana = isSolanaNetwork(network.id);

  const solanaClient = useMemo(() => {
    if (!isSolana) {
      return null;
    }
    const client = createSolanaClientFromNetwork(network.url, url);
    queryClient.setQueryData([GILL_HOOK_CLIENT_KEY], client);
    return client;
  }, [isSolana, network.url, url, queryClient]);

  const enhancedContext = useMemo<WalletUiContextValue<SolanaClient>>(
    () => ({
      ...existingContext,
      client: (solanaClient ?? existingContext.client) as SolanaClient,
    }),
    [existingContext, solanaClient]
  );

  const hasSolanaClient = isSolana && solanaClient;
  if (!hasSolanaClient) {
    return children;
  }

  const shouldInject = shouldInjectSolanaClient(
    existingContext.client,
    isSolana
  );

  const providerContent = (
    <SolanaProvider client={solanaClient} queryClient={queryClient}>
      {children}
    </SolanaProvider>
  );

  if (!shouldInject) {
    return providerContent;
  }

  return (
    <WalletUiContext.Provider value={enhancedContext}>
      {providerContent}
    </WalletUiContext.Provider>
  );
}

function useSolanaNetwork(): SolanaNetworkInfo | null {
  const { network } = useWalletNetwork();

  if (!network) {
    return null;
  }

  if (!isSolanaNetwork(network.id)) {
    return null;
  }

  return {
    networkId: network.id as SolanaNetworkId,
    cluster: getSolanaClusterMoniker(network.id as SolanaNetworkId),
  };
}

function useSolanaWallet(url?: SolanaClientUrlOrMoniker): SolanaClient {
  const wallet = useWallet<SolanaClient>();
  const { network } = useWalletNetwork();

  const fallbackClient = useMemo(() => {
    const urlOrMoniker = url ?? (network.url as SolanaClientUrlOrMoniker);
    return createSolanaClient({ urlOrMoniker });
  }, [network.url, url]);

  return wallet.client ?? fallbackClient;
}

function createDisabledQueryResult<
  T extends { isLoading?: boolean; isError?: boolean; error?: unknown },
>(result: T, override?: Partial<T>): T {
  return {
    ...result,
    isLoading: false,
    isError: false,
    error: null,
    ...override,
  };
}

function useSolanaBalance(address?: string) {
  const { account } = useWalletAccount();
  const solanaNetwork = useSolanaNetwork();
  const addressToUse = address ?? account?.address ?? "";
  const shouldFetch = Boolean(addressToUse && solanaNetwork);

  const result = useGillBalance({
    address: addressToUse,
    options: {
      enabled: shouldFetch,
    },
  });

  if (!shouldFetch) {
    return createDisabledQueryResult({
      ...result,
      balance: null,
    });
  }

  return result;
}

function useSolanaAccount(address?: string) {
  const { account } = useWalletAccount();
  const solanaNetwork = useSolanaNetwork();
  const addressToUse = address ?? account?.address ?? "";
  const shouldFetch = Boolean(addressToUse && solanaNetwork);

  const result = useGillAccount({
    address: addressToUse,
    options: {
      enabled: shouldFetch,
    },
  });

  if (!shouldFetch) {
    return createDisabledQueryResult({
      ...result,
      account: null,
    });
  }

  return result;
}

function useSolanaEnabled() {
  const solanaNetwork = useSolanaNetwork();
  return Boolean(solanaNetwork);
}

function useSolanaTokenAccount(
  mint: Address,
  owner: Address,
  options?: {
    commitment?: Commitment;
  }
) {
  const isSolana = useSolanaEnabled();

  return useGillTokenAccount({
    mint,
    owner,
    options: {
      enabled: isSolana,
      ...options,
    },
  });
}

function useSolanaTokenMint(
  mint: Address,
  options?: {
    commitment?: Commitment;
  }
) {
  const isSolana = useSolanaEnabled();

  return useGillTokenMint({
    mint,
    options: {
      enabled: isSolana,
      ...options,
    },
  });
}

function useSolanaProgramAccounts(
  program: Address,
  options?: {
    commitment?: Commitment;
    filters?: unknown[];
  }
) {
  const isSolana = useSolanaEnabled();

  return useGillProgramAccounts({
    program,
    options: {
      enabled: isSolana,
      ...options,
    },
  });
}

function useSolanaSignaturesForAddress(
  address: Address,
  options?: {
    limit?: number;
    before?: string;
    until?: string;
  }
) {
  const isSolana = useSolanaEnabled();

  return useGillSignaturesForAddress({
    address,
    options: {
      enabled: isSolana,
      ...options,
    },
  });
}

function useSolanaSignatureStatuses(
  signatures: string[],
  options?: {
    searchTransactionHistory?: boolean;
  }
) {
  const isSolana = useSolanaEnabled();

  return useGillSignatureStatuses({
    signatures,
    options: {
      enabled: isSolana && signatures.length > 0,
      ...options,
    },
  });
}

function useSolanaLatestBlockhash() {
  const isSolana = useSolanaEnabled();

  return useGillLatestBlockhash({
    options: {
      enabled: isSolana,
    },
  });
}

function useSolanaClient() {
  return useGillSolanaClient();
}

function useUpdateSolanaClient() {
  return useGillUpdateSolanaClient();
}

export {
  SolanaWalletProvider,
  isSolanaNetwork,
  useSolanaAccount,
  useSolanaBalance,
  useSolanaClient,
  useSolanaLatestBlockhash,
  useSolanaNetwork,
  useSolanaProgramAccounts,
  useSolanaSignatureStatuses,
  useSolanaSignaturesForAddress,
  useSolanaTokenAccount,
  useSolanaTokenMint,
  useSolanaWallet,
  useUpdateSolanaClient,
};
