"use client";

import { useWalletAccount } from "@/registry/default/hooks/use-wallet";
import { cn } from "@/registry/default/lib/utils";
import { Skeleton } from "@/registry/default/ui/skeleton";

interface WalletBalanceProps extends React.ComponentProps<"dl"> {
  balance?: bigint | null;
  format?: (balance: bigint) => string;
  showSymbol?: boolean;
  symbol?: string;
  decimals?: number;
  loading?: boolean;
}

function WalletBalance({
  className,
  balance,
  format,
  showSymbol = true,
  symbol = "SOL",
  decimals = 9,
  loading = false,
  ...props
}: WalletBalanceProps) {
  const { account } = useWalletAccount();
  const isLoading = !account || (loading && balance === null);

  const currentBalance = balance ?? BigInt(0);
  const formattedBalance = format
    ? format(currentBalance)
    : (Number(currentBalance) / 10 ** decimals).toFixed(4);

  return (
    <dl className={cn("flex items-center gap-1", className)} {...props}>
      <dt className="sr-only">Balance</dt>
      <dd>
        {isLoading ? (
          <div className="flex items-center gap-1">
            <Skeleton className="inline-block h-5 w-16" />
            {showSymbol && (
              <span className="text-muted-foreground">{symbol}</span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <data className="text-balance" value={currentBalance.toString()}>
              {formattedBalance}
            </data>
            {showSymbol && (
              <span className="text-muted-foreground">{symbol}</span>
            )}
          </div>
        )}
      </dd>
    </dl>
  );
}

export { WalletBalance };
