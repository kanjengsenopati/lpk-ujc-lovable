import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import type { Siswa } from "@/components/siswa/types";
import { SiswaActions } from "@/components/siswa/SiswaActions";
import { SiswaContent } from "@/components/siswa/SiswaContent";
import { SiswaViewToggle } from "@/components/siswa/SiswaViewToggle";
import { SiswaModal } from "@/components/siswa/SiswaModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const initialData: Siswa[] = [
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
];

export default function Siswa() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [data, setData] = useState<Siswa[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState<Partial<Siswa> | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const filteredData = data.filter((siswa) =>
    Object.values(siswa).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: string) => {
    const siswa = data.find((s) => s.id === id);
    if (siswa) {
      setSelectedSiswa(siswa);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedSiswa?.id) {
      setData((prev) => prev.filter((s) => s.id !== selectedSiswa.id));
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil dihapus",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedSiswa(null);
  };

  const handleEdit = (id: string) => {
    const siswa = data.find((s) => s.id === id);
    if (siswa) {
      setSelectedSiswa(siswa);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleAddClick = () => {
    setSelectedSiswa(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<Siswa>) => {
    if (modalMode === "add") {
      const newSiswa: Siswa = {
        id: String(data.length + 1),
        idSiswa: `SW${String(data.length + 1).padStart(3, "0")}`,
        ...formData,
      } as Siswa;
      setData((prev) => [...prev, newSiswa]);
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil ditambahkan",
      });
    } else {
      setData((prev) =>
        prev.map((s) =>
          s.id === selectedSiswa?.id ? { ...s, ...formData } : s
        )
      );
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil diperbarui",
      });
    }
    setIsModalOpen(false);
    setSelectedSiswa(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Data Siswa</h1>
          <p className="text-muted-foreground">
            Kelola data siswa dengan mudah dan efisien
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <SiswaActions
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddClick={handleAddClick}
          />
          <SiswaViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>
        <SiswaContent
          data={filteredData}
          viewMode={viewMode}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <SiswaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedSiswa}
          mode={modalMode}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus data siswa {selectedSiswa?.nama}? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}