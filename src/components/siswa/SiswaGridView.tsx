import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import { Siswa } from "./types";

interface SiswaGridViewProps {
  data: Siswa[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SiswaGridView({ data, onEdit, onDelete }: SiswaGridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((siswa) => (
        <Card key={siswa.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{siswa.nama}</CardTitle>
            <CardDescription>NIK: {siswa.nik}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Phone:</span> {siswa.phone}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {siswa.email}
                </div>
                <div>
                  <span className="font-medium">Jenis Kelamin:</span>{" "}
                  {siswa.jenisKelamin}
                </div>
                <div>
                  <span className="font-medium">Umur:</span> {siswa.umur} tahun
                </div>
                <div>
                  <span className="font-medium">Agama:</span> {siswa.agama}
                </div>
                <div>
                  <span className="font-medium">Golongan Darah:</span>{" "}
                  {siswa.golonganDarah}
                </div>
              </div>
              <div>
                <span className="font-medium">Alamat:</span> {siswa.alamat}
              </div>
              <div>
                <span className="font-medium">Tempat, Tanggal Lahir:</span>{" "}
                {siswa.tempatLahir}, {siswa.tanggalLahir}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Tinggi:</span>{" "}
                  {siswa.tinggiBadan} cm
                </div>
                <div>
                  <span className="font-medium">Berat:</span>{" "}
                  {siswa.beratBadan} kg
                </div>
                <div>
                  <span className="font-medium">Mata Kanan:</span>{" "}
                  {siswa.mataKanan}
                </div>
                <div>
                  <span className="font-medium">Mata Kiri:</span>{" "}
                  {siswa.mataKiri}
                </div>
                <div>
                  <span className="font-medium">Ukuran Sepatu:</span>{" "}
                  {siswa.ukuranSepatu}
                </div>
                <div>
                  <span className="font-medium">Ukuran Kepala:</span>{" "}
                  {siswa.ukuranKepala}
                </div>
              </div>
              <div>
                <span className="font-medium">Asal LPK:</span> {siswa.asalLpk}
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
                  onClick={() => onEdit(siswa.id)}
                  aria-label={`Edit data ${siswa.nama}`}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onDelete(siswa.id)}
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
  );
}