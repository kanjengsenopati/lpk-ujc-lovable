import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnVisibility, columns } from "./types";

interface TableHeaderProps {
  columnVisibility: ColumnVisibility;
}

export function SiswaTableHeader({ columnVisibility }: TableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">No</TableHead>
        {Object.entries(columns).map(
          ([key, { label }]) =>
            columnVisibility[key as keyof ColumnVisibility] && (
              <TableHead key={key}>{label}</TableHead>
            )
        )}
        <TableHead className="text-right">Aksi</TableHead>
      </TableRow>
    </TableHeader>
  );
}