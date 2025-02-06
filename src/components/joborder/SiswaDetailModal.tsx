
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Siswa } from "../siswa/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface SiswaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  siswa: Siswa | null;
}

export function SiswaDetailModal({ isOpen, onClose, siswa }: SiswaDetailModalProps) {
  if (!siswa) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[80%] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Siswa: {siswa.nama}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Informasi</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">NIK</TableCell>
                <TableCell>{siswa.nik}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{siswa.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">No. Telepon</TableCell>
                <TableCell>{siswa.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Alamat</TableCell>
                <TableCell>{siswa.alamat}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Jenis Kelamin</TableCell>
                <TableCell>{siswa.jenisKelamin}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tempat, Tanggal Lahir</TableCell>
                <TableCell>{`${siswa.tempatLahir}, ${siswa.tanggalLahir}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Umur</TableCell>
                <TableCell>{siswa.umur} tahun</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Agama</TableCell>
                <TableCell>{siswa.agama}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Golongan Darah</TableCell>
                <TableCell>{siswa.golonganDarah}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tinggi/Berat Badan</TableCell>
                <TableCell>{`${siswa.tinggiBadan} cm / ${siswa.beratBadan} kg`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Ukuran (Sepatu/Kepala)</TableCell>
                <TableCell>{`${siswa.ukuranSepatu} / ${siswa.ukuranKepala}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mata (Kanan/Kiri)</TableCell>
                <TableCell>{`${siswa.mataKanan} / ${siswa.mataKiri}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Asal LPK</TableCell>
                <TableCell>{siswa.asalLpk}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tanggal Masuk</TableCell>
                <TableCell>{siswa.tanggalMasuk}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
