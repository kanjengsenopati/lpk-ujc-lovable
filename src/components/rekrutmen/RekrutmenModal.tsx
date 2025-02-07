
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Rekrutmen } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RekrutmenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Rekrutmen>) => void;
  initialData: Partial<Rekrutmen> | null;
  mode: "add" | "edit";
}

export function RekrutmenModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: RekrutmenModalProps) {
  const [formData, setFormData] = useState<Partial<Rekrutmen>>({
    posisi: "",
    perusahaan: "",
    lokasi: "",
    gaji: "",
    deskripsi: "",
    persyaratan: [],
    tglMulai: "",
    tglBerakhir: "",
    kuota: 0,
    status: "Buka",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        posisi: "",
        perusahaan: "",
        lokasi: "",
        gaji: "",
        deskripsi: "",
        persyaratan: [],
        tglMulai: "",
        tglBerakhir: "",
        kuota: 0,
        status: "Buka",
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePersyaratanChange = (value: string) => {
    const requirements = value.split('\n').filter(req => req.trim() !== '');
    setFormData(prev => ({ ...prev, persyaratan: requirements }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[80%]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Rekrutmen Baru" : "Edit Rekrutmen"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="posisi">Posisi</Label>
              <Input
                id="posisi"
                value={formData.posisi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, posisi: e.target.value }))
                }
                placeholder="Masukkan posisi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="perusahaan">Perusahaan</Label>
              <Input
                id="perusahaan"
                value={formData.perusahaan}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, perusahaan: e.target.value }))
                }
                placeholder="Masukkan nama perusahaan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi</Label>
              <Input
                id="lokasi"
                value={formData.lokasi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lokasi: e.target.value }))
                }
                placeholder="Masukkan lokasi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gaji">Gaji</Label>
              <Input
                id="gaji"
                value={formData.gaji}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, gaji: e.target.value }))
                }
                placeholder="Masukkan gaji"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kuota">Kuota</Label>
              <Input
                id="kuota"
                type="number"
                value={formData.kuota}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, kuota: parseInt(e.target.value) }))
                }
                placeholder="Masukkan kuota"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))
                }
                placeholder="Masukkan deskripsi"
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="persyaratan">Persyaratan (satu per baris)</Label>
              <Textarea
                id="persyaratan"
                value={formData.persyaratan?.join('\n')}
                onChange={(e) => handlePersyaratanChange(e.target.value)}
                placeholder="Masukkan persyaratan"
                className="h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tglMulai">Tanggal Mulai</Label>
                <Input
                  id="tglMulai"
                  type="date"
                  value={formData.tglMulai}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tglMulai: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tglBerakhir">Tanggal Berakhir</Label>
                <Input
                  id="tglBerakhir"
                  type="date"
                  value={formData.tglBerakhir}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tglBerakhir: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "Buka" | "Tutup") =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buka">Buka</SelectItem>
                  <SelectItem value="Tutup">Tutup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-4">
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
