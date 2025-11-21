"use client";

import { useEffect, useId, useState } from "react";
import { useWalletNetwork } from "@/registry/default/hooks/use-wallet";
import type { Network } from "@/registry/default/lib/chains/network";
import { cn } from "@/registry/default/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/default/ui/native-select";

interface NetworkBadgeProps extends React.ComponentProps<typeof Badge> {
  network?: Network;
}

function NetworkBadge({
  className,
  network: propsNetwork,
  variant = "default",
  ...props
}: NetworkBadgeProps) {
  const { network: contextNetwork } = useWalletNetwork();
  const [mountedNetwork, setMountedNetwork] = useState<Network | undefined>(
    () => propsNetwork || contextNetwork
  );

  useEffect(() => {
    setMountedNetwork(propsNetwork || contextNetwork);
  }, [propsNetwork, contextNetwork]);

  const network = mountedNetwork;

  if (!network) {
    return null;
  }

  const networkName = network.label;

  return (
    <Badge
      className={cn("gap-1.5", className)}
      suppressHydrationWarning
      variant={variant}
      {...props}
    >
      {networkName}
    </Badge>
  );
}

interface NetworkSelectProps
  extends React.ComponentProps<typeof NativeSelect> {}

function NetworkSelect({ className, id, ...props }: NetworkSelectProps) {
  const generatedId = useId();
  const { networks, network, setNetwork } = useWalletNetwork();

  return (
    <NativeSelect
      className={cn("w-full", className)}
      id={id ?? generatedId}
      onChange={(e) => setNetwork(e.target.value as Network["id"])}
      value={network.id}
      {...props}
    >
      {networks.map((item) => (
        <NativeSelectOption key={item.id} value={item.id}>
          {item.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}

export { NetworkSelect, NetworkBadge };
