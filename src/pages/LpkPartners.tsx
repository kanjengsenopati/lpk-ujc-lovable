
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LpkPartnerModal } from "@/components/lpk/LpkPartnerModal";
import { columns } from "@/components/lpk/columns";
import type { LpkPartner } from "@/components/lpk/types";

const initialData: LpkPartner[] = [
  {
    id: "1",
    nama: "LPK Bina Profesi",
    direktur: "Ahmad Sanjaya",
    alamat: "Jl. Veteran No. 123, Jakarta Pusat",
    noIzin: "LP/2024/001",
    tglIzin: "2024-01-15",
    status: "Aktif",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    nama: "LPK Karya Mandiri",
    direktur: "Siti Rahayu",
    alamat: "Jl. Sudirman No. 45, Bandung",
    noIzin: "LP/2024/002",
    tglIzin: "2024-02-01",
    status: "Aktif",
    createdAt: "2024-02-01",
  },
];

export default function LpkPartners() {
  const [data, setData] = useState<LpkPartner[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLpk, setSelectedLpk] = useState<Partial<LpkPartner> | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((lpk) => lpk.id !== id));
    toast({
      title: "Berhasil",
      description: "Data LPK berhasil dihapus",
    });
  };

  const handleEdit = (id: string) => {
    const lpk = data.find((l) => l.id === id);
    if (lpk) {
      setSelectedLpk(lpk);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleAdd = () => {
    setSelectedLpk(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleSubmit = (formData: Partial<LpkPartner>) => {
    if (modalMode === "add") {
      const newLpk: LpkPartner = {
        id: String(data.length + 1),
        createdAt: new Date().toISOString().split("T")[0],
        ...formData,
      } as LpkPartner;
      setData((prev) => [...prev, newLpk]);
      toast({
        title: "Berhasil",
        description: "Data LPK berhasil ditambahkan",
      });
    } else {
      setData((prev) =>
        prev.map((lpk) =>
          lpk.id === selectedLpk?.id ? { ...lpk, ...formData } : lpk
        )
      );
      toast({
        title: "Berhasil",
        description: "Data LPK berhasil diperbarui",
      });
    }
    setIsModalOpen(false);
    setSelectedLpk(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Data LPK Partners</h1>
          <p className="text-muted-foreground">
            Kelola data LPK partner dengan mudah dan efisien
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah LPK
          </Button>
        </div>

        <DataTable columns={columns({ handleEdit, handleDelete })} data={data} />

        <LpkPartnerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedLpk}
          mode={modalMode}
        />
      </main>
    </div>
  );
}
