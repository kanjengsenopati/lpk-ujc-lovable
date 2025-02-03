import type { Siswa } from "../siswa/types";

export interface Rekrutmen {
  id: string;
  posisi: string;
  perusahaan: string;
  lokasi: string;
  gaji: string;
  deskripsi: string;
  persyaratan: string[];
  tglMulai: string;
  tglBerakhir: string;
  kuota: number;
  status: "Buka" | "Tutup";
  createdAt: string;
  relatedSiswa?: Siswa[];
}