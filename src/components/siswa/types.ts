export interface Siswa {
  id: string;
  idSiswa: string;
  nik: string;
  nama: string;
  phone: string;
  email: string;
  alamat: string;
  jenisKelamin: "Pria" | "Wanita";
  tempatLahir: string;
  tanggalLahir: string;
  umur: number;
  agama: "Islam" | "Kristen" | "Katolik" | "Hindu" | "Buddha" | "Konghucu";
  golonganDarah: "A" | "B" | "AB" | "O";
  tinggiBadan: number;
  beratBadan: number;
  mataKanan: number;
  mataKiri: number;
  ukuranSepatu: number;
  ukuranKepala: number;
  asalLpk: string;
  tanggalMasuk: string;
}

export const agamaOptions = [
  "Islam",
  "Kristen",
  "Katolik",
  "Hindu",
  "Buddha",
  "Konghucu",
] as const;

export const golonganDarahOptions = ["A", "B", "AB", "O"] as const;

export const jenisKelaminOptions = ["Pria", "Wanita"] as const;