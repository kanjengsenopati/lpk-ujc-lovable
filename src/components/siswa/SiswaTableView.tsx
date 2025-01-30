import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings2, Pencil, Trash } from "lucide-react";
import { Siswa } from "./types";
import { useState } from "react";

interface SiswaTableViewProps {
  data: Siswa[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

type ColumnVisibility = {
  [key in keyof Omit<Siswa, "id">]: boolean;
};

const defaultVisibility: ColumnVisibility = {
  idSiswa: true,
  nik: true,
  nama: true,
  phone: true,
  email: true,
  alamat: true,
  jenisKelamin: true,
  tempatLahir: true,
  tanggalLahir: true,
  umur: true,
  agama: true,
  golonganDarah: true,
  tinggiBadan: true,
  beratBadan: true,
  mataKanan: true,
  mataKiri: true,
  ukuranSepatu: true,
  ukuranKepala: true,
  asalLpk: true,
  tanggalMasuk: true,
};

export function SiswaTableView({ data, onEdit, onDelete }: SiswaTableViewProps) {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultVisibility);

  const columns = {
    idSiswa: { label: "ID Siswa", format: (value: string) => value },
    nik: { label: "NIK", format: (value: string) => value },
    nama: { label: "Nama", format: (value: string) => value },
    phone: { label: "Phone", format: (value: string) => value },
    email: { label: "Email", format: (value: string) => value },
    alamat: { label: "Alamat", format: (value: string) => value },
    jenisKelamin: { label: "Jenis Kelamin", format: (value: string) => value },
    tempatLahir: { label: "Tempat Lahir", format: (value: string) => value },
    tanggalLahir: { label: "Tanggal Lahir", format: (value: string) => value },
    umur: { label: "Umur", format: (value: number) => `${value} tahun` },
    agama: { label: "Agama", format: (value: string) => value },
    golonganDarah: { label: "Golongan Darah", format: (value: string) => value },
    tinggiBadan: { label: "Tinggi Badan", format: (value: number) => `${value} cm` },
    beratBadan: { label: "Berat Badan", format: (value: number) => `${value} kg` },
    mataKanan: { label: "Mata Kanan", format: (value: number) => value },
    mataKiri: { label: "Mata Kiri", format: (value: number) => value },
    ukuranSepatu: { label: "Ukuran Sepatu", format: (value: number) => value },
    ukuranKepala: { label: "Ukuran Kepala", format: (value: number) => value },
    asalLpk: { label: "Asal LPK", format: (value: string) => value },
    tanggalMasuk: { label: "Tanggal Masuk", format: (value: string) => value },
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex justify-end p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="w-4 h-4 mr-2" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {Object.entries(columns).map(([key, { label }]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={columnVisibility[key as keyof ColumnVisibility]}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, [key]: checked }))
                }
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              {Object.entries(columns).map(
                ([key, { label }]) =>
                  columnVisibility[key as keyof ColumnVisibility] && (
                    <TableHead key={key}>{label}</TableHead>
                  )
              )}
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((siswa, index) => (
              <TableRow key={siswa.id}>
                <TableCell>{index + 1}</TableCell>
                {Object.entries(columns).map(
                  ([key, { format }]) =>
                    columnVisibility[key as keyof ColumnVisibility] && (
                      <TableCell key={key}>
                        {format(siswa[key as keyof Siswa])}
                      </TableCell>
                    )
                )}
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(siswa.id)}
                      aria-label={`Edit data ${siswa.nama}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(siswa.id)}
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
  );
}