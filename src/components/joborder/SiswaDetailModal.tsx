
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Siswa } from "../siswa/types";

interface SiswaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  siswa: Siswa | null;
}

export function SiswaDetailModal({ isOpen, onClose, siswa }: SiswaDetailModalProps) {
  if (!siswa) return null;

  const detailGroups = [
    [
      { label: "NIK", value: siswa.nik },
      { label: "Email", value: siswa.email },
      { label: "No. Telepon", value: siswa.phone },
      { label: "Alamat", value: siswa.alamat },
      { label: "Jenis Kelamin", value: siswa.jenisKelamin },
      { label: "Tempat, Tanggal Lahir", value: `${siswa.tempatLahir}, ${siswa.tanggalLahir}` },
    ],
    [
      { label: "Umur", value: `${siswa.umur} tahun` },
      { label: "Agama", value: siswa.agama },
      { label: "Golongan Darah", value: siswa.golonganDarah },
      { label: "Tinggi Badan", value: `${siswa.tinggiBadan} cm` },
      { label: "Berat Badan", value: `${siswa.beratBadan} kg` },
      { label: "Ukuran Sepatu", value: siswa.ukuranSepatu },
    ],
    [
      { label: "Ukuran Kepala", value: siswa.ukuranKepala },
      { label: "Mata Kanan", value: siswa.mataKanan },
      { label: "Mata Kiri", value: siswa.mataKiri },
      { label: "Asal LPK", value: siswa.asalLpk },
      { label: "Tanggal Masuk", value: siswa.tanggalMasuk },
    ],
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Detail Siswa: {siswa.nama}</DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-8">
            {detailGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                {group.map(({ label, value }, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
