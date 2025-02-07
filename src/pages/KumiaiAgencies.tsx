
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { KumiaiAgencyModal } from "@/components/kumiai/KumiaiAgencyModal";
import { columns } from "@/components/kumiai/columns";
import type { KumiaiAgency } from "@/components/kumiai/types";

const initialData: KumiaiAgency[] = [
  {
    id: "1",
    nama: "Osaka Kyodo",
    prefektur: "Osaka",
    alamat: "1-2-3 Umeda, Kita-ku, Osaka",
    pic: "Tanaka Yamamoto",
    noTelp: "+81-6-1234-5678",
    email: "osaka@kyodo.jp",
    status: "Aktif",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    nama: "Tokyo Kyodo",
    prefektur: "Tokyo",
    alamat: "4-5-6 Shinjuku, Tokyo",
    pic: "Suzuki Sato",
    noTelp: "+81-3-8765-4321",
    email: "tokyo@kyodo.jp",
    status: "Aktif",
    createdAt: "2024-02-01",
  },
];

export default function KumiaiAgencies() {
  const [data, setData] = useState<KumiaiAgency[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<Partial<KumiaiAgency> | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((agency) => agency.id !== id));
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
      setData((prev) => [...prev, newAgency]);
      toast({
        title: "Berhasil",
        description: "Data kumiai agency berhasil ditambahkan",
      });
    } else {
      setData((prev) =>
        prev.map((agency) =>
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
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Data Kumiai Agencies
          </h1>
          <p className="text-muted-foreground">
            Kelola data kumiai agency dengan mudah dan efisien
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Agency
          </Button>
        </div>

        <DataTable columns={columns({ handleEdit, handleDelete })} data={data} />

        <KumiaiAgencyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedAgency}
          mode={modalMode}
        />
      </main>
    </div>
  );
}
