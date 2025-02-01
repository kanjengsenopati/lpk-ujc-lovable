import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SiswaSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SiswaSearch({ searchTerm, onSearchChange }: SiswaSearchProps) {
  return (
    <div className="relative w-full sm:w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
        placeholder="Cari data siswa..."
      />
    </div>
  );
}