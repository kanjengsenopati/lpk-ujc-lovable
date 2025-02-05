```typescript
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { agamaOptions, golonganDarahOptions, jenisKelaminOptions, type Siswa } from "./types";

interface SiswaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Siswa>) => void;
  initialData?: Partial<Siswa>;
  mode: "add" | "edit";
}

export function SiswaModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: SiswaModalProps) {
  const [formData, setFormData] = useState<Partial<Siswa>>(
    initialData || {
      idSiswa: "",
      nik: "",
      nama: "",
      phone: "",
      email: "",
      alamat: "",
      jenisKelamin: "Pria",
      tempatLahir: "",
      tanggalLahir: "",
      umur: 0,
      agama: "Islam",
      golonganDarah: "A",
      tinggiBadan: 0,
      beratBadan: 0,
      mataKanan: 0,
      mataKiri: 0,
      ukuranSepatu: 0,
      ukuranKepala: 0,
      asalLpk: "",
      tanggalMasuk: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    field: keyof Siswa,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[80%]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Siswa Baru" : "Edit Data Siswa"}
          </DialogTitle>
          <DialogDescription>
            Isi formulir berikut untuk {mode === "add" ? "menambahkan" : "mengubah"} data siswa
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nik">NIK</Label>
                <Input
                  id="nik"
                  value={formData.nik}
                  onChange={(e) => handleChange("nik", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                <Select
                  value={formData.jenisKelamin}
                  onValueChange={(value) => handleChange("jenisKelamin", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisKelaminOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agama">Agama</Label>
                <Select
                  value={formData.agama}
                  onValueChange={(value) => handleChange("agama", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Agama" />
                  </SelectTrigger>
                  <SelectContent>
                    {agamaOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="golonganDarah">Golongan Darah</Label>
                <Select
                  value={formData.golonganDarah}
                  onValueChange={(value) => handleChange("golonganDarah", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Golongan Darah" />
                  </SelectTrigger>
                  <SelectContent>
                    {golonganDarahOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tinggiBadan">Tinggi Badan (cm)</Label>
                <Input
                  id="tinggiBadan"
                  type="number"
                  value={formData.tinggiBadan}
                  onChange={(e) => handleChange("tinggiBadan", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beratBadan">Berat Badan (kg)</Label>
                <Input
                  id="beratBadan"
                  type="number"
                  value={formData.beratBadan}
                  onChange={(e) => handleChange("beratBadan", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                <Input
                  id="tanggalLahir"
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={(e) => handleChange("tanggalLahir", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asalLpk">Asal LPK</Label>
                <Input
                  id="asalLpk"
                  value={formData.asalLpk}
                  onChange={(e) => handleChange("asalLpk", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggalMasuk">Tanggal Masuk</Label>
                <Input
                  id="tanggalMasuk"
                  type="date"
                  value={formData.tanggalMasuk}
                  onChange={(e) => handleChange("tanggalMasuk", e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {mode === "add" ? "Tambah Siswa" : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
