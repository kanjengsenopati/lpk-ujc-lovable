```typescript
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { Mitra } from "./types";

const formSchema = z.object({
  namaLpk: z.string().min(1, "Nama LPK harus diisi"),
  namaPemilik: z.string().min(1, "Nama pemilik harus diisi"),
  alamat: z.string().min(1, "Alamat harus diisi"),
  noHp: z.string().min(1, "No HP harus diisi"),
  email: z.string().email("Format email tidak valid"),
});

interface MitraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Mitra>) => void;
  initialData: Partial<Mitra> | null;
  mode: "add" | "edit";
}

export function MitraModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: MitraModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaLpk: initialData?.namaLpk || "",
      namaPemilik: initialData?.namaPemilik || "",
      alamat: initialData?.alamat || "",
      noHp: initialData?.noHp || "",
      email: initialData?.email || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] w-[80%]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Mitra LPK" : "Edit Mitra LPK"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="namaLpk"
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
              name="namaPemilik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pemilik</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama pemilik" {...field} />
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
              name="noHp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No HP</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan no HP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan email" {...field} />
                  </FormControl>
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
```
