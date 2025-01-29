import type { Siswa } from "./types";
import { SiswaTableView } from "./SiswaTableView";
import { SiswaGridView } from "./SiswaGridView";

interface SiswaContentProps {
  data: Siswa[];
  viewMode: "table" | "grid";
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SiswaContent({
  data,
  viewMode,
  onEdit,
  onDelete,
}: SiswaContentProps) {
  return viewMode === "table" ? (
    <SiswaTableView data={data} onEdit={onEdit} onDelete={onDelete} />
  ) : (
    <SiswaGridView data={data} onEdit={onEdit} onDelete={onDelete} />
  );
}