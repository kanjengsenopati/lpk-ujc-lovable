import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import type { Siswa } from "@/components/siswa/types";
import { SiswaHeader } from "@/components/siswa/SiswaHeader";
import { SiswaActions } from "@/components/siswa/SiswaActions";
import { SiswaContent } from "@/components/siswa/SiswaContent";

const dummyData: Siswa[] = [
  {
    id: "1",
    idSiswa: "SW001",
    nama: "Budi Santoso",
    email: "budi.s@email.com",
    noHp: "081234567890",
    asalLpk: "LPK Maju Jaya",
    tanggalMasuk: "2024-01-15",
  },
  {
    id: "2",
    idSiswa: "SW002",
    nama: "Ani Wijaya",
    email: "ani.w@email.com",
    noHp: "081234567891",
    asalLpk: "LPK Bina Skill",
    tanggalMasuk: "2024-01-20",
  },
  {
    id: "3",
    idSiswa: "SW003",
    nama: "Citra Dewi",
    email: "citra.d@email.com",
    noHp: "081234567892",
    asalLpk: "LPK Karya Mandiri",
    tanggalMasuk: "2024-02-01",
  },
];

export default function Siswa() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredData = dummyData.filter((siswa) =>
    Object.values(siswa).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: string) => {
    toast({
      title: "Konfirmasi Hapus",
      description: "Data siswa berhasil dihapus",
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Siswa",
      description: "Membuka form edit data siswa",
    });
  };

  const handleAddClick = () => {
    toast({
      title: "Tambah Siswa",
      description: "Membuka form tambah data siswa",
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <SiswaHeader onAddClick={handleAddClick} />
        <SiswaActions
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewChange={setViewMode}
          onAddClick={handleAddClick}
        />
        <SiswaContent
          data={filteredData}
          viewMode={viewMode}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}