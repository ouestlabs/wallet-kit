import type { UiWallet, UiWalletAccount } from "@wallet-standard/react";
import { CircleAlertIcon, ExternalLink } from "lucide-react";
import type React from "react";
import {
  useWalletAccount,
  useWalletConnection,
} from "@/hooks/use-wallet";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { WalletIcon } from "@/components/wallet/icon";

function NoWalletDetected({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Alert variant="destructive">
        <CircleAlertIcon className="mt-0.5" />
        <AlertDescription>
          No wallet detected in this browser. Please install a Solana wallet
          extension.
        </AlertDescription>
      </Alert>
      <Button
        className="w-full"
        onClick={() => window.open("https://phantom.app/download", "_blank")}
      >
        Download Phantom Wallet
        <ExternalLink />
      </Button>
    </div>
  );
}

interface WalletListItemProps extends React.ComponentProps<typeof Button> {
  select?: (wallet: UiWalletAccount) => Promise<void> | void;
  wallet: UiWallet;
}

function WalletListItem({
  wallet,
  select,
  className,
  ...props
}: WalletListItemProps) {
  const { connect, isConnecting } = useWalletConnection({ wallet });
  const { wallet: connectedWallet } = useWalletAccount();
  const isConnected = connectedWallet?.name === wallet.name;

  return (
    <Button
      className={cn("h-auto", className)}
      disabled={isConnecting || isConnected}
      onClick={async () => {
        const accounts = await connect();
        const account = accounts?.[0];
        if (account && select) {
          await select(account);
        }
      }}
      {...props}
    >
      <WalletIcon wallet={wallet} />
      <span className="grow text-left">{wallet.name}</span>
      {isConnecting && <Spinner />}
      {isConnected && !isConnecting && (
        <Badge className="ml-2" variant="secondary">
          Connected
        </Badge>
      )}
    </Button>
  );
}

interface WalletListProps extends React.ComponentProps<"div"> {
  select?: (account: UiWalletAccount) => Promise<void> | void;
  wallets: UiWallet[];
}

function WalletList({ select, wallets, ...props }: WalletListProps) {
  if (wallets.length === 0) {
    return <NoWalletDetected className={props.className} />;
  }

  return (
    <div
      className={cn(
        "flex max-h-[300px] flex-col space-y-2 overflow-y-auto p-2",
        props.className
      )}
      {...props}
    >
      {wallets.map((wallet, index) => (
        <WalletListItem
          key={`${wallet.name}-${index}`}
          select={select}
          wallet={wallet}
        />
      ))}
    </div>
  );
}

export { WalletList };
