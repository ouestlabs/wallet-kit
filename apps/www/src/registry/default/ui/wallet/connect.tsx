"use client";

import {
  AlertCircle,
  ChevronLeftIcon,
  InfoIcon,
  LogOutIcon,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import {
  useWallet,
  useWalletAccount,
} from "@/registry/default/hooks/use-wallet";
import { ellipsify } from "@/registry/default/lib/ellipsify";
import { Button } from "@/registry/default/ui/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/registry/default/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";
import {
  NO_ERROR,
  WalletErrorDialog,
} from "@/registry/default/ui/wallet/error";
import { WalletIcon } from "@/registry/default/ui/wallet/icon";
import { WalletList } from "@/registry/default/ui/wallet/list";
import { WalletOnboarding } from "@/registry/default/ui/wallet/onboarding";

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
interface ConnectWalletPromptProps extends React.ComponentProps<typeof Item> {
  title?: string;
  description?: string;
}
function ConnectWalletPrompt({
  variant = "outline",
  title = "Wallet not connected",
  description = "Please connect your wallet to continue.",
  ...props
}: ConnectWalletPromptProps) {
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
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription className="-mt-1 text-xs">
          {description}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <ConnectWallet />
      </ItemActions>
    </Item>
  );
}

export { ConnectWallet, ConnectWalletPrompt };
