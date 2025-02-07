
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { KumiaiTable } from "@/components/kumiai/KumiaiTable";
import { KumiaiModalManager } from "@/components/kumiai/KumiaiModalManager";
import type { KumiaiAgency } from "@/components/kumiai/types";

interface KumiaiContentProps {
  data: KumiaiAgency[];
  onUpdate: (updatedData: KumiaiAgency[]) => void;
}

export function KumiaiContent({ data, onUpdate }: KumiaiContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<Partial<KumiaiAgency> | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    onUpdate(data.filter((agency) => agency.id !== id));
    toast({
      title: "Berhasil",
      description: "Data kumiai agency berhasil dihapus",
    });
  };

  const handleEdit = (id: string) => {
    const agency = data.find((a) => a.id === id);
    if (agency) {
      setSelectedAgency(agency);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (formData: Partial<KumiaiAgency>) => {
    if (modalMode === "add") {
      const newAgency: KumiaiAgency = {
        id: String(data.length + 1),
        createdAt: new Date().toISOString().split("T")[0],
        ...formData,
      } as KumiaiAgency;
      onUpdate([...data, newAgency]);
      toast({
        title: "Berhasil",
        description: "Data kumiai agency berhasil ditambahkan",
      });
    } else {
      onUpdate(
        data.map((agency) =>
          agency.id === selectedAgency?.id ? { ...agency, ...formData } : agency
        )
      );
      toast({
        title: "Berhasil",
        description: "Data kumiai agency berhasil diperbarui",
      });
    }
    setIsModalOpen(false);
    setSelectedAgency(null);
  };

  return (
    <>
      <KumiaiTable 
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <KumiaiModalManager
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedAgency={selectedAgency}
        mode={modalMode}
        onSubmit={handleSubmit}
      />
    </>
  );
}
