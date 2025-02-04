import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { NestedSiswaTable } from "./NestedSiswaTable";
import type { JobOrder } from "./types";

interface ExpandableRowProps {
  jobOrder: JobOrder;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpandableRow({ jobOrder, onEdit, onDelete }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
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
    </>
  );
}