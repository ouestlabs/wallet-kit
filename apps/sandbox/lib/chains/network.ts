import type { IdentifierString } from "@wallet-standard/core";

type Network = {
  id: IdentifierString;
  label: string;
  url: string;
};

function defineNetwork<NetworkType extends Network>({
  id,
  label,
  url,
}: NetworkType) {
  return (props: Partial<Network> = {}): Network => ({
    id,
    label,
    url,
    ...props,
  });
}

export { type Network, defineNetwork };
