
export interface KumiaiAgency {
  id: string;
  nama: string;
  prefektur: string;
  alamat: string;
  pic: string;
  noTelp: string;
  email: string;
  status: "Aktif" | "Tidak Aktif";
  createdAt: string;
}
