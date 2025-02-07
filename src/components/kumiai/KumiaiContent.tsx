
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/kumiai/columns";
import { KumiaiAgencyModal } from "@/components/kumiai/KumiaiAgencyModal";
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

  const handleAdd = () => {
    setSelectedAgency(null);
    setModalMode("add");
    setIsModalOpen(true);
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
      <DataTable columns={columns({ handleEdit, handleDelete })} data={data} />

      <KumiaiAgencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedAgency}
        mode={modalMode}
      />
    </>
  );
}
