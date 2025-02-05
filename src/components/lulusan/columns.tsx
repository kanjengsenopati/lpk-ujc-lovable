
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Lulusan } from "./types";
import { useState } from "react";
import { SiswaDetailModal } from "../joborder/SiswaDetailModal";

export const columns: ColumnDef<Lulusan>[] = [
  {
    accessorKey: "idSiswa",
    header: "ID Siswa",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "asalLpk",
    header: "Asal LPK",
  },
  {
    accessorKey: "tahunLulus",
    header: "Tahun Lulus",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lulusan = row.original;
      const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

      return (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDetailModalOpen(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          
          <SiswaDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            siswa={lulusan}
          />
        </>
      );
    },
  },
];
