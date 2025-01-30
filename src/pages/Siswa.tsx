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
    nik: "3275014708020001",
    nama: "Budi Santoso",
    phone: "081234567890",
    email: "budi.s@email.com",
    alamat: "Jl. Gatot Subroto No. 123, Jakarta Selatan",
    jenisKelamin: "Pria",
    tempatLahir: "Jakarta",
    tanggalLahir: "2002-08-07",
    umur: 21,
    agama: "Islam",
    golonganDarah: "B",
    tinggiBadan: 170,
    beratBadan: 65,
    mataKanan: 1.5,
    mataKiri: 1.5,
    ukuranSepatu: 42,
    ukuranKepala: 58,
    asalLpk: "LPK Maju Jaya",
    tanggalMasuk: "2024-01-15",
  },
  {
    id: "2",
    idSiswa: "SW002",
    nik: "3275014708020002",
    nama: "Ani Wijaya",
    phone: "081234567891",
    email: "ani.w@email.com",
    alamat: "Jl. Sudirman No. 45, Jakarta Pusat",
    jenisKelamin: "Wanita",
    tempatLahir: "Bandung",
    tanggalLahir: "2003-03-15",
    umur: 20,
    agama: "Islam",
    golonganDarah: "A",
    tinggiBadan: 160,
    beratBadan: 50,
    mataKanan: 1.0,
    mataKiri: 1.0,
    ukuranSepatu: 37,
    ukuranKepala: 56,
    asalLpk: "LPK Bina Skill",
    tanggalMasuk: "2024-01-20",
  },
  {
    id: "3",
    idSiswa: "SW003",
    nik: "3275014708020003",
    nama: "Citra Dewi",
    phone: "081234567892",
    email: "citra.d@email.com",
    alamat: "Jl. Thamrin No. 67, Jakarta Pusat",
    jenisKelamin: "Wanita",
    tempatLahir: "Surabaya",
    tanggalLahir: "2002-11-20",
    umur: 21,
    agama: "Kristen",
    golonganDarah: "O",
    tinggiBadan: 165,
    beratBadan: 55,
    mataKanan: 2.0,
    mataKiri: 1.5,
    ukuranSepatu: 38,
    ukuranKepala: 57,
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
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
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