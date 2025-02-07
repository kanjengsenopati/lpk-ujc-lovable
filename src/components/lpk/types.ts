
export interface LpkPartner {
  id: string;
  nama: string;
  direktur: string;
  alamat: string;
  noIzin: string;
  tglIzin: string;
  status: "Aktif" | "Tidak Aktif";
  createdAt: string;
}
