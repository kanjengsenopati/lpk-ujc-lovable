import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/table/DataTable";
import type { Rekrutmen } from "@/components/rekrutmen/types";
import { getColumns } from "@/components/rekrutmen/columns";
import { RekrutmenModal } from "@/components/rekrutmen/RekrutmenModal";
import { RekrutmenHeader } from "@/components/rekrutmen/RekrutmenHeader";
import { RekrutmenActions } from "@/components/rekrutmen/RekrutmenActions";
import { DeleteDialog } from "@/components/rekrutmen/DeleteDialog";

const initialData: Rekrutmen[] = [
  {
    id: "1",
    posisi: "Magang Technical Staff",
    perusahaan: "Toyota Manufacturing",
    lokasi: "Nagoya, Jepang",
    gaji: "¥250,000/bulan",
    deskripsi: "Program magang untuk posisi technical staff di pabrik Toyota",
    persyaratan: [
      "Usia maksimal 26 tahun",
      "Lulusan minimal D3/S1 Teknik",
      "JLPT N3",
      "Sehat jasmani dan rohani"
    ],
    tglMulai: "2024-04-01",
    tglBerakhir: "2024-03-31",
    kuota: 5,
    status: "Buka",
    createdAt: "2024-02-01"
  },
  {
    id: "2",
    posisi: "Magang Production Engineer",
    perusahaan: "Mitsubishi Electric",
    lokasi: "Osaka, Jepang",
    gaji: "¥230,000/bulan",
    deskripsi: "Program magang untuk production engineer di divisi elektronik",
    persyaratan: [
      "Usia maksimal 25 tahun",
      "Lulusan S1 Teknik Elektro",
      "JLPT N3",
      "Pengalaman project minimal 1 tahun"
    ],
    tglMulai: "2024-05-01",
    tglBerakhir: "2025-04-30",
    kuota: 3,
    status: "Buka",
    createdAt: "2024-02-15"
  }
];

export default function Rekrutmen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Rekrutmen[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRekrutmen, setSelectedRekrutmen] = useState<Partial<Rekrutmen> | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    const rekrutmen = data.find((r) => r.id === id);
    if (rekrutmen) {
      setSelectedRekrutmen(rekrutmen);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedRekrutmen?.id) {
      setData((prev) => prev.filter((r) => r.id !== selectedRekrutmen.id));
      toast({
        title: "Berhasil",
        description: "Data rekrutmen berhasil dihapus",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedRekrutmen(null);
  };

  const handleEdit = (id: string) => {
    const rekrutmen = data.find((r) => r.id === id);
    if (rekrutmen) {
      setSelectedRekrutmen(rekrutmen);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleAddClick = () => {
    setSelectedRekrutmen(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<Rekrutmen>) => {
    if (modalMode === "add") {
      const newRekrutmen: Rekrutmen = {
        id: String(data.length + 1),
        createdAt: new Date().toISOString().split('T')[0],
        ...formData,
      } as Rekrutmen;
      setData((prev) => [...prev, newRekrutmen]);
      toast({
        title: "Berhasil",
        description: "Data rekrutmen berhasil ditambahkan",
      });
    } else {
      setData((prev) =>
        prev.map((r) =>
          r.id === selectedRekrutmen?.id ? { ...r, ...formData } : r
        )
      );
      toast({
        title: "Berhasil",
        description: "Data rekrutmen berhasil diperbarui",
      });
    }
    setIsModalOpen(false);
    setSelectedRekrutmen(null);
  };

  const columns = getColumns({
    handleEdit,
    handleDelete,
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <RekrutmenHeader />
        
        <RekrutmenActions
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={handleAddClick}
        />

        <DataTable
          columns={columns}
          data={data.filter((rekrutmen) =>
            Object.values(rekrutmen).some((value) =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          )}
        />

        <RekrutmenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedRekrutmen}
          mode={modalMode}
        />

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          selectedRekrutmen={selectedRekrutmen}
          onConfirm={confirmDelete}
        />
      </main>
    </div>
  );
}
