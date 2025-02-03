import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { JobOrderModal } from "@/components/joborder/JobOrderModal";
import type { JobOrder } from "@/components/joborder/types";
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
    createdAt: "2024-03-01"
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
    createdAt: "2024-03-15"
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

  const filteredData = data.filter((jobOrder) =>
    Object.values(jobOrder).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
                <TableRow key={jobOrder.id}>
                  <TableCell className="font-medium">{jobOrder.jobType}</TableCell>
                  <TableCell>{jobOrder.kumiaiAgency}</TableCell>
                  <TableCell>{jobOrder.jmlPeserta}</TableCell>
                  <TableCell>{jobOrder.tglRekrut}</TableCell>
                  <TableCell>{jobOrder.tglWawancara}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(jobOrder.id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(jobOrder.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
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