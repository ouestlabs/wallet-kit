"use client";
import {
  isWalletStandardError,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED,
} from "@wallet-standard/core";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const NO_ERROR = Symbol("NO_ERROR");

function getWalletErrorMessage(
  err: unknown,
  fallbackMessage: React.ReactNode
): React.ReactNode {
  if (
    isWalletStandardError(
      err,
      WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED
    )
  ) {
    return (
      <>
        This account does not support the{" "}
        <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
          {err.context.featureName}
        </code>{" "}
        feature
      </>
    );
  }
  if (
    isWalletStandardError(
      err,
      WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED
    )
  ) {
    return (
      <div className="flex flex-col gap-4">
        <p>
          The wallet {err.context.walletName} (
          {err.context.supportedChains.sort().map((chain, ii, { length }) => (
            <React.Fragment key={chain}>
              <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
                {chain}
              </code>
              {ii === length - 1 ? null : ", "}
            </React.Fragment>
          ))}
          ) does not support the
          <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
            {err.context.featureName}
          </code>
          feature.
        </p>
        <div>
          Features supported:
          <ul className="mt-2 list-disc pl-5">
            {err.context.supportedFeatures.sort().map((featureName) => (
              <li key={featureName}>
                <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
                  {featureName}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (
    isWalletStandardError(
      err,
      WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED
    )
  ) {
    return (
      <div className="flex flex-col gap-4">
        <p>
          This account does not support the chain{" "}
          <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
            {err.context.chain}
          </code>
          .
        </p>
        <div>
          Chains supported:
          <ul className="mt-2 list-disc pl-5">
            {err.context.supportedChains.sort().map((chain) => (
              <li key={chain}>
                <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm">
                  {chain}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (err && typeof err === "object" && "message" in err) {
    return String(err.message);
  }
  return fallbackMessage;
}

type WalletErrorDialogProps = {
  error: unknown;
  onClose?: () => unknown;
  title?: string;
};

function WalletErrorDialog({ error, onClose, title }: WalletErrorDialogProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (!open && (!onClose || onClose() !== false)) {
          setIsOpen(false);
        }
      }}
      open={isOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            {title ?? "We encountered the following error"}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 rounded-lg border border-muted bg-muted p-4">
            {getWalletErrorMessage(error, "Unknown")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Close</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { WalletErrorDialog, getWalletErrorMessage, NO_ERROR };
