
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { KumiaiHeader } from "@/components/kumiai/KumiaiHeader";
import { KumiaiContent } from "@/components/kumiai/KumiaiContent";
import type { KumiaiAgency } from "@/components/kumiai/types";

const initialData: KumiaiAgency[] = [
  {
    id: "1",
    nama: "Osaka Kyodo",
    prefektur: "Osaka",
    alamat: "1-2-3 Umeda, Kita-ku, Osaka",
    pic: "Tanaka Yamamoto",
    noTelp: "+81-6-1234-5678",
    email: "osaka@kyodo.jp",
    status: "Aktif",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    nama: "Tokyo Kyodo",
    prefektur: "Tokyo",
    alamat: "4-5-6 Shinjuku, Tokyo",
    pic: "Suzuki Sato",
    noTelp: "+81-3-8765-4321",
    email: "tokyo@kyodo.jp",
    status: "Aktif",
    createdAt: "2024-02-01",
  },
];

export default function KumiaiAgencies() {
  const [data, setData] = useState<KumiaiAgency[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <KumiaiHeader onAdd={() => setIsModalOpen(true)} />
        <KumiaiContent 
          data={data} 
          onUpdate={setData} 
        />
      </main>
    </div>
  );
}
