import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import { SiswaSearch } from "@/components/siswa/SiswaSearch";
import { SiswaViewToggle } from "@/components/siswa/SiswaViewToggle";
import { SiswaTableView } from "@/components/siswa/SiswaTableView";
import { SiswaGridView } from "@/components/siswa/SiswaGridView";
import type { Siswa } from "@/components/siswa/types";

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

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Siswa</h1>
          <p className="text-muted-foreground">
            Kelola data siswa yang terdaftar dalam sistem
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
            <SiswaSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <SiswaViewToggle
              viewMode={viewMode}
              onViewChange={setViewMode}
            />
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Siswa
          </Button>
        </div>

        {viewMode === "table" ? (
          <SiswaTableView
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <SiswaGridView
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
