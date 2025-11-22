import type { UiWallet } from "@wallet-standard/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WalletIconProps extends React.ComponentProps<typeof Avatar> {
  wallet?: Pick<UiWallet, "icon" | "name">;
}

function WalletIcon({ wallet, ...props }: WalletIconProps) {
  if (!wallet) {
    return null;
  }
  return (
    <Avatar {...props}>
      {wallet.icon && (
        <AvatarImage
          alt={wallet.name || "Wallet"}
          className="rounded-sm"
          src={wallet.icon}
        />
      )}
      <AvatarFallback>
        {(wallet?.name?.[0] || "W").toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export { WalletIcon };
