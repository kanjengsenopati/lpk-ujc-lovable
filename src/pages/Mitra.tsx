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
import { MitraModal } from "@/components/mitra/MitraModal";
import type { Mitra } from "@/components/mitra/types";
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

const initialData: Mitra[] = [
  {
    id: "1",
    namaLpk: "LPK Sakura Indonesia",
    namaPemilik: "Budi Santoso",
    alamat: "Jl. Asia Afrika No. 123, Bandung",
    noHp: "081234567890",
    email: "lpksakura@email.com",
    createdAt: "2024-02-01",
  },
  {
    id: "2",
    namaLpk: "LPK Nusantara Jaya",
    namaPemilik: "Dewi Kusuma",
    alamat: "Jl. Gatot Subroto No. 45, Jakarta",
    noHp: "087654321098",
    email: "lpknusantara@email.com",
    createdAt: "2024-02-15",
  },
];

export default function Mitra() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Mitra[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMitra, setSelectedMitra] = useState<Partial<Mitra> | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const filteredData = data.filter((mitra) =>
    Object.values(mitra).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: string) => {
    const mitra = data.find((m) => m.id === id);
    if (mitra) {
      setSelectedMitra(mitra);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedMitra?.id) {
      setData((prev) => prev.filter((m) => m.id !== selectedMitra.id));
      toast({
        title: "Berhasil",
        description: "Data mitra LPK berhasil dihapus",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedMitra(null);
  };

  const handleEdit = (id: string) => {
    const mitra = data.find((m) => m.id === id);
    if (mitra) {
      setSelectedMitra(mitra);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleAddClick = () => {
    setSelectedMitra(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<Mitra>) => {
    if (modalMode === "add") {
      const newMitra: Mitra = {
        id: String(data.length + 1),
        createdAt: new Date().toISOString().split("T")[0],
        ...formData,
      } as Mitra;
      setData((prev) => [...prev, newMitra]);
      toast({
        title: "Berhasil",
        description: "Data mitra LPK berhasil ditambahkan",
      });
    } else {
      setData((prev) =>
        prev.map((m) =>
          m.id === selectedMitra?.id ? { ...m, ...formData } : m
        )
      );
      toast({
        title: "Berhasil",
        description: "Data mitra LPK berhasil diperbarui",
      });
    }
    setIsModalOpen(false);
    setSelectedMitra(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Data Mitra LPK</h1>
          <p className="text-muted-foreground">
            Kelola data mitra LPK dengan mudah dan efisien
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari mitra LPK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-8"
              />
            </div>
          </div>
          <Button onClick={handleAddClick}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Mitra LPK
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama LPK</TableHead>
                <TableHead>Nama Pemilik</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>No HP</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((mitra) => (
                <TableRow key={mitra.id}>
                  <TableCell className="font-medium">{mitra.namaLpk}</TableCell>
                  <TableCell>{mitra.namaPemilik}</TableCell>
                  <TableCell>{mitra.alamat}</TableCell>
                  <TableCell>{mitra.noHp}</TableCell>
                  <TableCell>{mitra.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(mitra.id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(mitra.id)}
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

        <MitraModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedMitra}
          mode={modalMode}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus data mitra LPK{" "}
                {selectedMitra?.namaLpk}? Tindakan ini tidak dapat dibatalkan.
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