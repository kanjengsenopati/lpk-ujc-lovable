import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { JobOrderModal } from "@/components/joborder/JobOrderModal";
import { ExpandableRow } from "@/components/joborder/ExpandableRow";
import type { JobOrder } from "@/components/joborder/types";
import type { Siswa } from "@/components/siswa/types";
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

// Sample siswa data for demonstration
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Data Job Order</h1>
          <p className="text-muted-foreground">
            Kelola data job order magang Jepang dengan mudah dan efisien
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari job order..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-8"
              />
            </div>
          </div>
          <Button onClick={handleAddClick}>
            <Plus className="w-4 h-4" />
            Tambah Job Order
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Tipe Pekerjaan</TableHead>
                <TableHead>Kumiai Agency</TableHead>
                <TableHead>Jumlah Peserta</TableHead>
                <TableHead>Tanggal Rekrut</TableHead>
                <TableHead>Tanggal Wawancara</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((jobOrder) => (
                <ExpandableRow
                  key={jobOrder.id}
                  jobOrder={jobOrder}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        <JobOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedJobOrder}
          mode={modalMode}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus data job order ini? 
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
