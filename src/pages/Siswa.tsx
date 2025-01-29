import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Grid, List, Pencil, Plus, Trash, Search } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";

interface Siswa {
  id: string;
  idSiswa: string;
  nama: string;
  email: string;
  noHp: string;
  asalLpk: string;
  tanggalMasuk: string;
}

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
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                aria-label="Cari siswa"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setViewMode("table")}
                className={viewMode === "table" ? "bg-accent" : ""}
                aria-label="Tampilan tabel"
                aria-pressed={viewMode === "table"}
              >
                <List className="w-4 h-4 mr-2" />
                Tabel
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-accent" : ""}
                aria-label="Tampilan grid"
                aria-pressed={viewMode === "grid"}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
            </div>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Siswa
          </Button>
        </div>

        {viewMode === "table" ? (
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead>ID Siswa</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>No HP</TableHead>
                    <TableHead>Asal LPK</TableHead>
                    <TableHead>Tanggal Masuk</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((siswa, index) => (
                    <TableRow key={siswa.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{siswa.idSiswa}</TableCell>
                      <TableCell>{siswa.nama}</TableCell>
                      <TableCell>{siswa.email}</TableCell>
                      <TableCell>{siswa.noHp}</TableCell>
                      <TableCell>{siswa.asalLpk}</TableCell>
                      <TableCell>{siswa.tanggalMasuk}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(siswa.id)}
                            aria-label={`Edit data ${siswa.nama}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(siswa.id)}
                            aria-label={`Hapus data ${siswa.nama}`}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((siswa) => (
              <Card key={siswa.id}>
                <CardHeader>
                  <CardTitle>{siswa.nama}</CardTitle>
                  <CardDescription>{siswa.idSiswa}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Email:</span> {siswa.email}
                    </div>
                    <div>
                      <span className="font-medium">No HP:</span> {siswa.noHp}
                    </div>
                    <div>
                      <span className="font-medium">Asal LPK:</span>{" "}
                      {siswa.asalLpk}
                    </div>
                    <div>
                      <span className="font-medium">Tanggal Masuk:</span>{" "}
                      {siswa.tanggalMasuk}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(siswa.id)}
                        aria-label={`Edit data ${siswa.nama}`}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDelete(siswa.id)}
                        aria-label={`Hapus data ${siswa.nama}`}
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}