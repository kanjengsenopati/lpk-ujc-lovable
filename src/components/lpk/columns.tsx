
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { LpkPartner } from "./types";
import { Badge } from "@/components/ui/badge";

interface ColumnsProps {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const columns = ({
  handleEdit,
  handleDelete,
}: ColumnsProps): ColumnDef<LpkPartner>[] => [
  {
    accessorKey: "nama",
    header: "Nama LPK",
  },
  {
    accessorKey: "direktur",
    header: "Direktur",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "noIzin",
    header: "No. Izin",
  },
  {
    accessorKey: "tglIzin",
    header: "Tanggal Izin",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Aktif" ? "default" : "destructive"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEdit(row.original.id)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
