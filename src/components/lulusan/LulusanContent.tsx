
import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./columns";
import { Lulusan } from "./types";

const initialData: Lulusan[] = [
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
    tahunLulus: "2024",
    status: "Bekerja",
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
    tahunLulus: "2024",
    status: "Melanjutkan Studi",
  },
];

export function LulusanContent() {
  const [data] = useState<Lulusan[]>(initialData);

  return (
    <div className="rounded-md border">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
