"use client";

import { getExplorerLink } from "gill";
import { useWalletAccount } from "@/registry/default/hooks/use-wallet";
import { formatSol } from "@/registry/default/lib/chains/solana";
import {
  useSolanaBalance,
  useSolanaNetwork,
} from "@/registry/default/lib/chains/solana/adapter";
import { ellipsify } from "@/registry/default/lib/ellipsify";
import { WalletBalance } from "@/registry/default/ui/wallet/balance";
import { ConnectWallet } from "@/registry/default/ui/wallet/connect";
import { ExplorerLink } from "@/registry/default/ui/wallet/explorer-link";
import { WalletIcon } from "@/registry/default/ui/wallet/icon";
import { WalletMenu } from "@/registry/default/ui/wallet/menu";
import { NetworkBadge } from "@/registry/default/ui/wallet/network";

export default function SolanaClientDemo() {
  const { account, wallet } = useWalletAccount();
  const solanaNetwork = useSolanaNetwork();
  const { balance, isLoading, isError, error } = useSolanaBalance();

  const explorerUrl =
    account && solanaNetwork
      ? getExplorerLink({
          address: account.address,
          cluster: solanaNetwork.cluster,
        })
      : "";

  if (!account) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 text-center">
          <h3 className="font-semibold text-sm">Solana Client Demo</h3>
          <p className="text-muted-foreground text-xs">
            Connect a wallet to use Solana RPC client
          </p>
        </div>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-sm">Solana Client Demo</h3>
          <p className="text-muted-foreground text-xs">
            Using <code className="text-xs">useSolanaWallet()</code> hook
          </p>
        </div>
        {account && <NetworkBadge />}
      </div>

      {account && wallet && (
        <>
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <WalletIcon wallet={wallet} />
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-medium text-sm">{wallet.name}</p>
              <p className="font-mono text-muted-foreground text-xs">
                {ellipsify(account.address, 8)}
              </p>
            </div>
            <WalletMenu />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs">Balance</p>
              {isError && error ? (
                <span className="text-destructive text-sm">
                  {error instanceof Error ? error.message : String(error)}
                </span>
              ) : (
                <WalletBalance
                  balance={balance ?? null}
                  format={(balanceValue) =>
                    formatSol({ balance: balanceValue })
                  }
                  loading={isLoading}
                />
              )}
            </div>
            {explorerUrl && (
              <ExplorerLink label="View on Explorer" url={explorerUrl} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
