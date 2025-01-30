import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import type { Siswa } from "./types";
import { ColumnVisibilityDropdown } from "./table/ColumnVisibilityDropdown";
import { SiswaTableHeader } from "./table/TableHeader";
import { RowActions } from "./table/RowActions";
import { ColumnVisibility, columns, defaultVisibility } from "./table/types";

interface SiswaTableViewProps {
  data: Siswa[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SiswaTableView({ data, onEdit, onDelete }: SiswaTableViewProps) {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultVisibility);

  const handleVisibilityChange = (key: keyof ColumnVisibility, checked: boolean) => {
    setColumnVisibility((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex justify-end p-4">
        <ColumnVisibilityDropdown
          columnVisibility={columnVisibility}
          onVisibilityChange={handleVisibilityChange}
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <SiswaTableHeader columnVisibility={columnVisibility} />
          <TableBody>
            {data.map((siswa, index) => (
              <TableRow key={siswa.id}>
                <TableCell>{index + 1}</TableCell>
                {Object.entries(columns).map(
                  ([key, { format }]) =>
                    columnVisibility[key as keyof ColumnVisibility] && (
                      <TableCell key={key}>
                        {format(siswa[key as keyof Siswa])}
                      </TableCell>
                    )
                )}
                <TableCell>
                  <RowActions
                    id={siswa.id}
                    nama={siswa.nama}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}