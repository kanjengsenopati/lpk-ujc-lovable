import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RekrutmenSearch } from "./RekrutmenSearch";

interface RekrutmenActionsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function RekrutmenActions({
  searchTerm,
  onSearchChange,
  onAddClick,
}: RekrutmenActionsProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2 items-center">
        <RekrutmenSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
      <Button onClick={onAddClick}>
        <Plus className="w-4 h-4 mr-2" />
        Tambah Rekrutmen
      </Button>
    </div>
  );
}