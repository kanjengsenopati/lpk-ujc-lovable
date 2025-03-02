import type { Siswa } from "../siswa/types";

export interface JobOrder {
  id: string;
  nama: string;
  jobType: string;
  kumiaiAgency: string;
  catatan: string;
  isActive: boolean;
  createdAt: string;
  jmlPeserta: number;
  tglRekrut: string;
  tglCetak?: string;
  tglPelatihan?: string;
  tglWawancara: string;
  relatedSiswa?: Siswa[];
}

export const jobTypes = [
  "Konstruksi",
  "Manufaktur", 
  "Perawat",
  "Pertanian",
  "Pengolahan Makanan",
  "Perhotelan"
] as const;

export const kumiaiAgencies = [
  "Aichi Kyodo",
  "Fukuoka Kyodo",
  "Hiroshima Kyodo",
  "Osaka Kyodo",
  "Tokyo Kyodo",
  "Yokohama Kyodo"
] as const;
