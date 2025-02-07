
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { KumiaiAgencyModal } from "@/components/kumiai/KumiaiAgencyModal";
import type { KumiaiAgency } from "@/components/kumiai/types";

interface KumiaiModalManagerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgency: Partial<KumiaiAgency> | null;
  mode: "add" | "edit";
  onSubmit: (data: Partial<KumiaiAgency>) => void;
}

export function KumiaiModalManager({
  isOpen,
  onClose,
  selectedAgency,
  mode,
  onSubmit,
}: KumiaiModalManagerProps) {
  return (
    <KumiaiAgencyModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={selectedAgency}
      mode={mode}
    />
  );
}
