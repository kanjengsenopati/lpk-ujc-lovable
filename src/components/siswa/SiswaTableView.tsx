import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Siswa } from "./types";

interface SiswaTableViewProps {
  data: Siswa[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SiswaTableView({ data, onEdit, onDelete }: SiswaTableViewProps) {
  return (
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
            {data.map((siswa, index) => (
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