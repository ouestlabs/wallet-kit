"use client";

import { Item, ItemActions, ItemContent } from "@/registry/default/ui/item";
import {
  NetworkBadge,
  NetworkSelect,
} from "@/registry/default/ui/wallet/network";

export default function NetworkSelectDemo() {
  return (
    <Item variant="outline">
      <ItemContent>
        <NetworkBadge />
      </ItemContent>
      <ItemActions>
        <NetworkSelect />
      </ItemActions>
    </Item>
  );
}
