"use client";

import type { UiWallet, UiWalletAccount } from "@wallet-standard/react";
import { CopyIcon, LogOutIcon } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConnectWallet } from "@/components/wallet/connect";
import { NO_ERROR, WalletErrorDialog } from "@/components/wallet/error";
import { WalletIcon } from "@/components/wallet/icon";
import {
  useWallet,
  useWalletAccount,
  useWalletConnection,
} from "@/hooks/use-wallet";
import { ellipsify } from "@/lib/ellipsify";

function WalletMenuContent({
  account,
  selectedWallet,
  onDisconnect,
  onError,
  setDropdownOpen,
}: {
  account: UiWalletAccount;
  selectedWallet: UiWallet;
  onDisconnect: () => void;
  onError: (error: unknown) => void;
  setDropdownOpen: (open: boolean) => void;
}) {
  const { copy } = useWallet();
  const { disconnect, isDisconnecting } = useWalletConnection({
    wallet: selectedWallet,
  });

  const handleCopy = () => {
    try {
      copy();
      toast.success("Address copied to clipboard");
    } catch {
      toast.error("Failed to copy address");
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      onDisconnect();
      setDropdownOpen(false);
    } catch (err) {
      onError(err);
    }
  };

  return (
    <>
      <DropdownMenuLabel className="flex items-center gap-2">
        <WalletIcon className="rounded-sm" wallet={selectedWallet} />
        <div className="flex flex-col">
          <span>{selectedWallet.name}</span>
          <span className="text-muted-foreground text-xs">Connected</span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleCopy}>
        <CopyIcon />
        <span className="font-mono">{ellipsify(account.address, 8)}</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        disabled={isDisconnecting}
        onClick={handleDisconnect}
        variant="destructive"
      >
        <LogOutIcon />
        <span>{isDisconnecting ? "Disconnecting..." : "Disconnect"}</span>
      </DropdownMenuItem>
    </>
  );
}

function WalletMenu({
  className,
  children,
  variant = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { wallets } = useWallet();
  const { account, setAccount } = useWalletAccount();
  const [error, setError] = useState<symbol>(NO_ERROR);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedWallet = useMemo(() => {
    if (!account) {
      return;
    }
    return wallets.find((wallet) =>
      wallet.accounts.some((acc) => acc.address === account.address)
    );
  }, [account, wallets]);

  const handleError = (err: unknown) => {
    setError(err as symbol);
  };

  if (!account) {
    return <ConnectWallet className={className} variant={variant} {...props} />;
  }

  if (!selectedWallet) {
    return null;
  }

  return (
    <>
      <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className={className} variant={variant} {...props}>
            <WalletIcon className="size-4 rounded-sm" wallet={selectedWallet} />
            <span className="font-mono text-sm">
              {ellipsify(account.address, 4)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <WalletMenuContent
            account={account}
            onDisconnect={() => setAccount(undefined)}
            onError={handleError}
            selectedWallet={selectedWallet}
            setDropdownOpen={setDropdownOpen}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      {error !== NO_ERROR && (
        <WalletErrorDialog error={error} onClose={() => setError(NO_ERROR)} />
      )}
    </>
  );
}

export { WalletMenu };
