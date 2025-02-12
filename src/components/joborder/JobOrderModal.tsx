
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
    nama: "",
    jobType: "",
    kumiaiAgency: "",
    catatan: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        nama: "",
        jobType: "",
        kumiaiAgency: "",
        catatan: "",
        isActive: true,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Job Order Baru" : "Edit Job Order"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Job Order</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nama: e.target.value }))
                }
                placeholder="Masukkan nama job order"
              />
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
              <Label htmlFor="jobType">Jenis Job</Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, jobType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis job" />
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
              <Label htmlFor="catatan">Catatan</Label>
              <Textarea
                id="catatan"
                value={formData.catatan}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, catatan: e.target.value }))
                }
                placeholder="Masukkan catatan"
                className="h-24"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Status Aktif</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
            </div>
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
