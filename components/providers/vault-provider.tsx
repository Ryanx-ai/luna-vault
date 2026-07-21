"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ShellData, VaultSummary } from "@/lib/types/workspace";

type VaultContextValue = {
  shellData: ShellData;
  selectedVault: VaultSummary;
  selectVault: (vaultId: string) => void;
};

const VaultContext = createContext<VaultContextValue | null>(null);

export function VaultProvider({ shellData, children }: { shellData: ShellData; children: React.ReactNode }) {
  const [selectedVaultId, setSelectedVaultId] = useState(shellData.vaults[0]?.id ?? "");
  const selectedVault = shellData.vaults.find((vault) => vault.id === selectedVaultId) ?? shellData.vaults[0];

  const value = useMemo(() => ({ shellData, selectedVault, selectVault: setSelectedVaultId }), [shellData, selectedVault]);

  if (!selectedVault) return null;
  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const context = useContext(VaultContext);
  if (!context) throw new Error("useVault must be used within VaultProvider");
  return context;
}
