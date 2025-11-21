"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  NO_ERROR,
  WalletErrorDialog,
} from "@/registry/default/ui/wallet/error";

export default function WalletErrorDemo() {
  const [error, setError] = useState<symbol>(NO_ERROR);

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() => setError(Symbol("Demo Error"))}
        variant="destructive"
      >
        Trigger Error
      </Button>
      {error !== NO_ERROR && (
        <WalletErrorDialog
          error={new Error("This is a demo error message")}
          onClose={() => setError(NO_ERROR)}
        />
      )}
    </div>
  );
}
