
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/kumiai/columns";
import type { KumiaiAgency } from "@/components/kumiai/types";

interface KumiaiTableProps {
  data: KumiaiAgency[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function KumiaiTable({ data, onEdit, onDelete }: KumiaiTableProps) {
  return (
    <DataTable 
      columns={columns({ 
        handleEdit: onEdit, 
        handleDelete: onDelete 
      })} 
      data={data} 
    />
  );
}
