"use client";

import {
  AlertCircle,
  ChevronLeftIcon,
  InfoIcon,
  LogOutIcon,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { NO_ERROR, WalletErrorDialog } from "@/components/wallet/error";
import { WalletIcon } from "@/components/wallet/icon";
import { WalletList } from "@/components/wallet/list";
import { WalletOnboarding } from "@/components/wallet/onboarding";
import { useWallet, useWalletAccount } from "@/hooks/use-wallet";
import { ellipsify } from "@/lib/ellipsify";

function ConnectWallet({
  className,
  children,
  variant = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { wallets, disconnect } = useWallet();
  const { setAccount, account, wallet } = useWalletAccount();
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [error, setError] = useState<symbol>(NO_ERROR);

  useEffect(() => {
    if (!open) {
      setShowInfo(false);
    }
  }, [open]);

  if (account) {
    return (
      <ButtonGroup className={className}>
        <ButtonGroupText>
          <WalletIcon className="mr-2 size-4 rounded-sm" wallet={wallet} />
          {ellipsify(account.address)}
        </ButtonGroupText>
        <Button
          onClick={() => disconnect()}
          size="icon"
          variant={variant}
          {...props}
        >
          <LogOutIcon />
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button className={className} variant={variant} {...props}>
            {children || "Connect Wallet"}
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader className="flex flex-row items-center justify-between">
            {!showInfo && (
              <DialogTitle className="">Connect Wallet</DialogTitle>
            )}
            <DialogDescription className="sr-only" />
            <Button
              className="size-7 rounded-full"
              onClick={() => setShowInfo(!showInfo)}
              size="icon"
              variant="ghost"
            >
              {showInfo ? (
                <ChevronLeftIcon className="text-foreground/50 group-hover:text-foreground" />
              ) : (
                <InfoIcon className="text-foreground/50 group-hover:text-foreground" />
              )}
            </Button>
          </DialogHeader>

          {showInfo ? (
            <WalletOnboarding onClose={() => setShowInfo(false)} />
          ) : (
            <WalletList
              select={(selectedAccount) => {
                setAccount(selectedAccount);
                setOpen(false);
              }}
              wallets={wallets}
            />
          )}
        </DialogContent>
      </Dialog>
      {error !== NO_ERROR && (
        <WalletErrorDialog error={error} onClose={() => setError(NO_ERROR)} />
      )}
    </>
  );
}

function ConnectWalletPrompt({
  variant = "outline",
  ...props
}: React.ComponentProps<typeof Item>) {
  const { account } = useWalletAccount();
  if (account) {
    return null;
  }
  return (
    <Item variant={variant} {...props}>
      <ItemMedia variant="icon">
        <AlertCircle className="size-4 text-destructive" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Wallet not connected</ItemTitle>
        <ItemDescription className="-mt-1 text-xs">
          Please connect your wallet to continue.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <ConnectWallet />
      </ItemActions>
    </Item>
  );
}

export { ConnectWallet, ConnectWalletPrompt };
