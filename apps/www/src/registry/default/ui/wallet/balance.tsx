"use client";

import { useWalletAccount } from "@/registry/default/hooks/use-wallet";
import { cn } from "@/registry/default/lib/utils";
import { Skeleton } from "@/registry/default/ui/skeleton";

interface WalletBalanceProps extends React.ComponentProps<"div"> {
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

  if (!account) {
    return (
      <div className={cn("flex items-center gap-1", className)} {...props}>
        <Skeleton className="h-5 w-20" />
      </div>
    );
  }

  if (loading && balance === null) {
    return (
      <div className={cn("flex items-center gap-1", className)} {...props}>
        <Skeleton className="h-5 w-20" />
      </div>
    );
  }

  const currentBalance = balance ?? BigInt(0);
  const formattedBalance = format
    ? format(currentBalance)
    : (Number(currentBalance) / 10 ** decimals).toFixed(4);

  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <span className="font-medium">{formattedBalance}</span>
      {showSymbol && (
        <span className="text-muted-foreground text-sm">{symbol}</span>
      )}
    </div>
  );
}

export { WalletBalance };
