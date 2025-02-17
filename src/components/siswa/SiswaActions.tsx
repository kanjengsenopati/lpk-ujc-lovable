import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SiswaSearch } from "./SiswaSearch";

interface SiswaActionsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function SiswaActions({
  searchTerm,
  onSearchChange,
  onAddClick,
}: SiswaActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
        <SiswaSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
      <Button className="w-full sm:w-auto" onClick={onAddClick}>
        <Plus className="w-4 h-4 mr-2" />
        Tambah Siswa
      </Button>
    </div>
  );
}