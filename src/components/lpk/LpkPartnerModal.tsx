
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { LpkPartner } from "./types";

const formSchema = z.object({
  nama: z.string().min(1, "Nama LPK harus diisi"),
  direktur: z.string().min(1, "Nama direktur harus diisi"),
  alamat: z.string().min(1, "Alamat harus diisi"),
  noIzin: z.string().min(1, "No. Izin harus diisi"),
  tglIzin: z.string().min(1, "Tanggal izin harus diisi"),
  status: z.enum(["Aktif", "Tidak Aktif"]),
});

interface LpkPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<LpkPartner>) => void;
  initialData: Partial<LpkPartner> | null;
  mode: "add" | "edit";
}

export function LpkPartnerModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: LpkPartnerModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: initialData?.nama || "",
      direktur: initialData?.direktur || "",
      alamat: initialData?.alamat || "",
      noIzin: initialData?.noIzin || "",
      tglIzin: initialData?.tglIzin || "",
      status: initialData?.status || "Aktif",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah LPK Partner" : "Edit LPK Partner"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama LPK</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama LPK" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direktur"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direktur</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama direktur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan alamat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noIzin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Izin</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan no. izin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tglIzin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Izin</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit">
                {mode === "add" ? "Tambah" : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
