import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { JobOrder } from "./types";
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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Job Order Baru" : "Edit Job Order"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
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