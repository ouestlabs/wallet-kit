"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ActiveThemeProvider } from "@/components/theme/active";
import { LayoutProvider } from "@/hooks/use-layout";
import {
  createSolanaDevnet,
  createSolanaMainnet,
} from "@/registry/default/lib/chains/solana";
import { SolanaWalletProvider } from "@/registry/default/lib/chains/solana/adapter";
import { Toaster } from "@/registry/default/ui/sonner";
import {
  createWalletConfig,
  WalletProvider,
} from "@/registry/default/ui/wallet/provider";

const queryClient = new QueryClient();

const walletConfig = createWalletConfig({
  networks: [createSolanaMainnet(), createSolanaDevnet()],
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <LayoutProvider>
          <NuqsAdapter>
            <ActiveThemeProvider>
              <WalletProvider config={walletConfig}>
                <SolanaWalletProvider queryClient={queryClient}>
                  {children}
                </SolanaWalletProvider>
              </WalletProvider>
              <Toaster position="top-center" richColors />
            </ActiveThemeProvider>
          </NuqsAdapter>
        </LayoutProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
