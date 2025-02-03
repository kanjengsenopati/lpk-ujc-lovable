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
import { RekrutmenModal } from "@/components/rekrutmen/RekrutmenModal";
import type { Rekrutmen } from "@/components/rekrutmen/types";
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
import { Badge } from "@/components/ui/badge";

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

  const filteredData = data.filter((rekrutmen) =>
    Object.values(rekrutmen).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Data Rekrutmen</h1>
          <p className="text-muted-foreground">
            Kelola data rekrutmen magang Jepang dengan mudah dan efisien
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari rekrutmen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px] pl-8"
              />
            </div>
          </div>
          <Button onClick={handleAddClick}>
            <Plus className="w-4 h-4" />
            Tambah Rekrutmen
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posisi</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Kuota</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Mulai</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((rekrutmen) => (
                <TableRow key={rekrutmen.id}>
                  <TableCell className="font-medium">{rekrutmen.posisi}</TableCell>
                  <TableCell>{rekrutmen.perusahaan}</TableCell>
                  <TableCell>{rekrutmen.lokasi}</TableCell>
                  <TableCell>{rekrutmen.kuota}</TableCell>
                  <TableCell>
                    <Badge variant={rekrutmen.status === "Buka" ? "default" : "secondary"}>
                      {rekrutmen.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{rekrutmen.tglMulai}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(rekrutmen.id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(rekrutmen.id)}
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

        <RekrutmenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedRekrutmen}
          mode={modalMode}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus data rekrutmen {selectedRekrutmen?.posisi}? 
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