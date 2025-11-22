"use client";

import { useWalletAccount } from "@/registry/default/hooks/use-wallet";
import { formatSol } from "@/registry/default/lib/chains/solana";
import { useSolanaBalance } from "@/registry/default/lib/chains/solana/adapter";
import { WalletBalance } from "@/registry/default/ui/wallet/balance";

export default function WalletBalanceDemo() {
  const { account } = useWalletAccount();
  const { balance, isLoading, isError, error } = useSolanaBalance();

  const errorMessage =
    error instanceof Error ? error.message : String(error ?? "");

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center">
        <p className="mb-2 text-muted-foreground text-sm">
          {account ? "Connected Wallet Balance" : "No wallet connected"}
        </p>
        {isError && errorMessage && (
          <p className="mb-2 text-destructive text-xs">Error: {errorMessage}</p>
        )}
        <WalletBalance
          balance={balance ?? null}
          format={(balanceValue) => formatSol({ balance: balanceValue })}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
