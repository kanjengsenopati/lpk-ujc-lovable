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
import { Grid, List, Pencil, Plus, Trash } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

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

  const filteredData = dummyData.filter((siswa) =>
    Object.values(siswa).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Siswa</h1>
          <p className="text-muted-foreground">
            Kelola data siswa yang terdaftar dalam sistem
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Cari siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
            <Button
              variant="outline"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-accent" : ""}
            >
              <List className="w-4 h-4 mr-2" />
              Tabel
            </Button>
            <Button
              variant="outline"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent" : ""}
            >
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Siswa
          </Button>
        </div>

        {viewMode === "table" ? (
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>ID Siswa</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No HP</TableHead>
                  <TableHead>Asal LPK</TableHead>
                  <TableHead>Tanggal Masuk</TableHead>
                  <TableHead>Aksi</TableHead>
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
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((siswa, index) => (
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
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
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
      </div>
    </div>
  );
}