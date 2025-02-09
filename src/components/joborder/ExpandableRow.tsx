
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { NestedSiswaTable } from "./NestedSiswaTable";
import type { JobOrder } from "./types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "../ui/table";

interface ExpandableRowProps {
  jobOrder: JobOrder;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpandableRow({ jobOrder, onEdit, onDelete }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow className="hover:bg-muted/50">
        <TableCell className="w-4">
          <NestedSiswaTable
            isOpen={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            siswaData={jobOrder.relatedSiswa || []}
          />
        </TableCell>
        <TableCell>{jobOrder.jobType}</TableCell>
        <TableCell>{jobOrder.kumiaiAgency}</TableCell>
        <TableCell>{jobOrder.jmlPeserta}</TableCell>
        <TableCell>{jobOrder.tglRekrut}</TableCell>
        <TableCell>{jobOrder.tglWawancara}</TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(jobOrder.id)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(jobOrder.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={7} className="p-0 border-0">
            <div className="bg-muted/50">
              {jobOrder.relatedSiswa && jobOrder.relatedSiswa.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>Asal LPK</TableHead>
                      <TableHead>Tanggal Masuk</TableHead>
                      <TableHead className="w-[100px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobOrder.relatedSiswa.map((siswa) => (
                      <TableRow key={siswa.id}>
                        <TableCell>{siswa.nama}</TableCell>
                        <TableCell>{siswa.asalLpk}</TableCell>
                        <TableCell>{siswa.tanggalMasuk}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const nestedTable = document.querySelector(`[data-siswa-id="${siswa.id}"]`);
                              if (nestedTable) {
                                nestedTable.querySelector<HTMLButtonElement>('.view-details-btn')?.click();
                              }
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">Tidak ada data siswa</div>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
