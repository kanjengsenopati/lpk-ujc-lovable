
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExpandableRow } from "./ExpandableRow";
import { DataTableViewOptions } from "@/components/table/DataTableViewOptions";
import type { JobOrder } from "./types";

interface JobOrderTableProps {
  data: JobOrder[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JobOrderTable({ data, onEdit, onDelete }: JobOrderTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start">
        <DataTableViewOptions columns={[
          { key: "jobType", label: "Tipe Pekerjaan" },
          { key: "kumiaiAgency", label: "Kumiai Agency" },
          { key: "jmlPeserta", label: "Jumlah Peserta" },
          { key: "tglRekrut", label: "Tanggal Rekrut" },
          { key: "tglWawancara", label: "Tanggal Wawancara" }
        ]} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tipe Pekerjaan</TableHead>
              <TableHead>Kumiai Agency</TableHead>
              <TableHead>Jumlah Peserta</TableHead>
              <TableHead>Tanggal Rekrut</TableHead>
              <TableHead>Tanggal Wawancara</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((jobOrder) => (
              <ExpandableRow
                key={jobOrder.id}
                jobOrder={jobOrder}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
