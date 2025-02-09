
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";
import type { JobOrder } from "./types";
import type { Siswa } from "../siswa/types";
import { jobTypes, kumiaiAgencies } from "./types";

interface JobOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<JobOrder>) => void;
  initialData: Partial<JobOrder> | null;
  mode: "add" | "edit";
}

export function JobOrderModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: JobOrderModalProps) {
  const [formData, setFormData] = useState<Partial<JobOrder>>({
    jobType: "",
    kumiaiAgency: "",
    jmlPeserta: 0,
    tglRekrut: "",
    tglCetak: "",
    tglPelatihan: "",
    tglWawancara: "",
  });

  // Sample siswa data - in a real app, this would come from your data source
  const [availableSiswa] = useState<Siswa[]>([
    {
      id: "1",
      idSiswa: "SW001",
      nik: "3275014708020001",
      nama: "Budi Santoso",
      phone: "081234567890",
      email: "budi.s@email.com",
      alamat: "Jl. Gatot Subroto No. 123, Jakarta Selatan",
      jenisKelamin: "Pria",
      tempatLahir: "Jakarta",
      tanggalLahir: "2002-08-07",
      umur: 21,
      agama: "Islam",
      golonganDarah: "B",
      tinggiBadan: 170,
      beratBadan: 65,
      mataKanan: 1.5,
      mataKiri: 1.5,
      ukuranSepatu: 42,
      ukuranKepala: 58,
      asalLpk: "LPK Maju Jaya",
      tanggalMasuk: "2024-01-15",
    },
    {
      id: "2",
      idSiswa: "SW002",
      nik: "3275014708020002",
      nama: "Ani Wijaya",
      phone: "081234567891",
      email: "ani.w@email.com",
      alamat: "Jl. Sudirman No. 45, Jakarta Pusat",
      jenisKelamin: "Wanita",
      tempatLahir: "Bandung",
      tanggalLahir: "2003-03-15",
      umur: 20,
      agama: "Islam",
      golonganDarah: "A",
      tinggiBadan: 160,
      beratBadan: 50,
      mataKanan: 1.0,
      mataKiri: 1.0,
      ukuranSepatu: 37,
      ukuranKepala: 56,
      asalLpk: "LPK Bina Skill",
      tanggalMasuk: "2024-01-20",
    },
  ]);

  const [selectedSiswa, setSelectedSiswa] = useState<Siswa[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.relatedSiswa) {
        setSelectedSiswa(initialData.relatedSiswa);
      }
    } else {
      setFormData({
        jobType: "",
        kumiaiAgency: "",
        jmlPeserta: 0,
        tglRekrut: "",
        tglCetak: "",
        tglPelatihan: "",
        tglWawancara: "",
      });
      setSelectedSiswa([]);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      relatedSiswa: selectedSiswa,
    });
  };

  const toggleSiswa = (siswa: Siswa) => {
    setSelectedSiswa((prev) => {
      const isSelected = prev.some((s) => s.id === siswa.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== siswa.id);
      } else {
        return [...prev, siswa];
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[80%]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Job Order Baru" : "Edit Job Order"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobType">Tipe Pekerjaan</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, jobType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe pekerjaan" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kumiaiAgency">Kumiai Agency</Label>
                <Select
                  value={formData.kumiaiAgency}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, kumiaiAgency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kumiai agency" />
                  </SelectTrigger>
                  <SelectContent>
                    {kumiaiAgencies.map((agency) => (
                      <SelectItem key={agency} value={agency}>
                        {agency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jmlPeserta">Jumlah Peserta</Label>
                <Input
                  id="jmlPeserta"
                  type="number"
                  value={formData.jmlPeserta}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, jmlPeserta: parseInt(e.target.value) }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tglRekrut">Tanggal Rekrut</Label>
                <Input
                  id="tglRekrut"
                  type="date"
                  value={formData.tglRekrut}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tglRekrut: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tglCetak">Tanggal Cetak</Label>
                <Input
                  id="tglCetak"
                  type="date"
                  value={formData.tglCetak}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tglCetak: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tglPelatihan">Tanggal Pelatihan</Label>
                <Input
                  id="tglPelatihan"
                  type="date"
                  value={formData.tglPelatihan}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tglPelatihan: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tglWawancara">Tanggal Wawancara</Label>
                <Input
                  id="tglWawancara"
                  type="date"
                  value={formData.tglWawancara}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tglWawancara: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pilih Siswa</Label>
            <ScrollArea className="h-[200px] border rounded-md p-2">
              <div className="space-y-2">
                {availableSiswa.map((siswa) => {
                  const isSelected = selectedSiswa.some((s) => s.id === siswa.id);
                  return (
                    <div
                      key={siswa.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${
                        isSelected ? "bg-muted" : ""
                      }`}
                      onClick={() => toggleSiswa(siswa)}
                    >
                      <div>
                        <p className="font-medium">{siswa.nama}</p>
                        <p className="text-sm text-muted-foreground">
                          {siswa.idSiswa} - {siswa.asalLpk}
                        </p>
                      </div>
                      {isSelected ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {mode === "add" ? "Tambah" : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
