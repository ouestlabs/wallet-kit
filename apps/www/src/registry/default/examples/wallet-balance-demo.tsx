"use client";

import { useWalletAccount } from "@/registry/default/hooks/use-wallet";
import { formatSol } from "@/registry/default/lib/chains/solana";
import { useSolanaBalance } from "@/registry/default/lib/chains/solana/adapter";
import { WalletBalance } from "@/registry/default/ui/wallet/balance";

export default function WalletBalanceDemo() {
  const { account } = useWalletAccount();
  const { balance, isLoading, isError, error } = useSolanaBalance();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center">
        <p className="mb-2 text-muted-foreground text-sm">
          {account ? "Connected Wallet Balance" : "No wallet connected"}
        </p>
        {isError && error && (
          <p className="mb-2 text-destructive text-xs">
            Error: {error.message}
          </p>
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
