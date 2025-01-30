import type { Siswa } from "../types";

export type ColumnVisibility = {
  [key in keyof Omit<Siswa, "id">]: boolean;
};

export type FormatFunction = (value: string | number) => string;

export interface Column {
  label: string;
  format: FormatFunction;
}

export type Columns = {
  [key in keyof Omit<Siswa, "id">]: Column;
};

export const defaultVisibility: ColumnVisibility = {
  idSiswa: true,
  nik: true,
  nama: true,
  phone: true,
  email: true,
  alamat: true,
  jenisKelamin: true,
  tempatLahir: true,
  tanggalLahir: true,
  umur: true,
  agama: true,
  golonganDarah: true,
  tinggiBadan: true,
  beratBadan: true,
  mataKanan: true,
  mataKiri: true,
  ukuranSepatu: true,
  ukuranKepala: true,
  asalLpk: true,
  tanggalMasuk: true,
};

export const columns: Columns = {
  idSiswa: { label: "ID Siswa", format: (value) => String(value) },
  nik: { label: "NIK", format: (value) => String(value) },
  nama: { label: "Nama", format: (value) => String(value) },
  phone: { label: "Phone", format: (value) => String(value) },
  email: { label: "Email", format: (value) => String(value) },
  alamat: { label: "Alamat", format: (value) => String(value) },
  jenisKelamin: { label: "Jenis Kelamin", format: (value) => String(value) },
  tempatLahir: { label: "Tempat Lahir", format: (value) => String(value) },
  tanggalLahir: { label: "Tanggal Lahir", format: (value) => String(value) },
  umur: { label: "Umur", format: (value) => `${value} tahun` },
  agama: { label: "Agama", format: (value) => String(value) },
  golonganDarah: { label: "Golongan Darah", format: (value) => String(value) },
  tinggiBadan: { label: "Tinggi Badan", format: (value) => `${value} cm` },
  beratBadan: { label: "Berat Badan", format: (value) => `${value} kg` },
  mataKanan: { label: "Mata Kanan", format: (value) => String(value) },
  mataKiri: { label: "Mata Kiri", format: (value) => String(value) },
  ukuranSepatu: { label: "Ukuran Sepatu", format: (value) => String(value) },
  ukuranKepala: { label: "Ukuran Kepala", format: (value) => String(value) },
  asalLpk: { label: "Asal LPK", format: (value) => String(value) },
  tanggalMasuk: { label: "Tanggal Masuk", format: (value) => String(value) },
};