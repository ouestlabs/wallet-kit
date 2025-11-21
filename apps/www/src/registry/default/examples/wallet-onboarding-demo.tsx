"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { WalletOnboarding } from "@/registry/default/ui/wallet/onboarding";

export default function WalletOnboardingDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Show Onboarding</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <WalletOnboarding
            onClose={() => {
              toast.info("Learned more about wallets");
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
