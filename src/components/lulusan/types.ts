
import type { Siswa } from "../siswa/types";

export interface Lulusan extends Siswa {
  tahunLulus: string;
  status: "Bekerja" | "Melanjutkan Studi" | "Wirausaha" | "Mencari Kerja";
}

export const statusLulusanOptions = [
  "Bekerja",
  "Melanjutkan Studi",
  "Wirausaha",
  "Mencari Kerja",
] as const;
