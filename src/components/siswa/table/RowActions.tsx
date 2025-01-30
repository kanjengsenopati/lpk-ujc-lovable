import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface RowActionsProps {
  id: string;
  nama: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RowActions({ id, nama, onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onEdit(id)}
        aria-label={`Edit data ${nama}`}
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDelete(id)}
        aria-label={`Hapus data ${nama}`}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}