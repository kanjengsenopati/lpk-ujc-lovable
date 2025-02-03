import { ColumnDef } from "@tanstack/react-table";
import { Rekrutmen } from "./types";
import { DataTableColumnHeader } from "../table/DataTableColumnHeader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const columns: ColumnDef<Rekrutmen>[] = [
  {
    accessorKey: "posisi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posisi" />
    ),
  },
  {
    accessorKey: "perusahaan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Perusahaan" />
    ),
  },
  {
    accessorKey: "lokasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi" />
    ),
  },
  {
    accessorKey: "kuota",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kuota" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Buka" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "tglMulai",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Mulai" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rekrutmen = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(rekrutmen.id)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(rekrutmen.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];