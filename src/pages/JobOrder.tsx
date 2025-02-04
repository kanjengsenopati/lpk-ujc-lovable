import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import { JobOrderModal } from "@/components/joborder/JobOrderModal";
import { JobOrderHeader } from "@/components/joborder/JobOrderHeader";
import { JobOrderActions } from "@/components/joborder/JobOrderActions";
import { JobOrderTable } from "@/components/joborder/JobOrderTable";
import { DeleteConfirmationDialog } from "@/components/joborder/DeleteConfirmationDialog";
import type { JobOrder } from "@/components/joborder/types";
import type { Siswa } from "@/components/siswa/types";

const sampleSiswa: Siswa[] = [
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

const initialData: JobOrder[] = [
  {
    id: "1",
    jobType: "Konstruksi",
    kumiaiAgency: "Tokyo Kyodo",
    jmlPeserta: 15,
    tglRekrut: "2024-04-01",
    tglCetak: "2024-04-15",
    tglPelatihan: "2024-05-01",
    tglWawancara: "2024-04-20",
    createdAt: "2024-03-01",
    relatedSiswa: [sampleSiswa[0]]
  },
  {
    id: "2",
    jobType: "Manufaktur",
    kumiaiAgency: "Osaka Kyodo",
    jmlPeserta: 10,
    tglRekrut: "2024-05-01",
    tglCetak: "2024-05-15",
    tglPelatihan: "2024-06-01",
    tglWawancara: "2024-05-20",
    createdAt: "2024-03-15",
    relatedSiswa: [sampleSiswa[1]]
  }
];

export default function JobOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<JobOrder[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedJobOrder, setSelectedJobOrder] = useState<Partial<JobOrder> | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    const jobOrder = data.find((j) => j.id === id);
    if (jobOrder) {
      setSelectedJobOrder(jobOrder);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedJobOrder?.id) {
      setData((prev) => prev.filter((j) => j.id !== selectedJobOrder.id));
      toast({
        title: "Berhasil",
        description: "Data job order berhasil dihapus",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedJobOrder(null);
  };

  const handleEdit = (id: string) => {
    const jobOrder = data.find((j) => j.id === id);
    if (jobOrder) {
      setSelectedJobOrder(jobOrder);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleAddClick = () => {
    setSelectedJobOrder(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<JobOrder>) => {
    if (modalMode === "add") {
      const newJobOrder: JobOrder = {
        id: String(data.length + 1),
        createdAt: new Date().toISOString().split('T')[0],
        ...formData,
      } as JobOrder;
      setData((prev) => [...prev, newJobOrder]);
      toast({
        title: "Berhasil",
        description: "Data job order berhasil ditambahkan",
      });
    } else {
      setData((prev) =>
        prev.map((j) =>
          j.id === selectedJobOrder?.id ? { ...j, ...formData } : j
        )
      );
      toast({
        title: "Berhasil",
        description: "Data job order berhasil diperbarui",
      });
    }
    setIsModalOpen(false);
    setSelectedJobOrder(null);
  };

  const filteredData = data.filter((jobOrder) =>
    Object.values(jobOrder).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <JobOrderHeader />
        <JobOrderActions
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={handleAddClick}
        />
        <JobOrderTable
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <JobOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedJobOrder}
          mode={modalMode}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />
      </main>
    </div>
  );
}
