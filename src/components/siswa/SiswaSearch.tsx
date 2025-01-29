import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SiswaSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SiswaSearch({ searchTerm, onSearchChange }: SiswaSearchProps) {
  return (
    <div className="relative w-full sm:w-[300px]">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Cari siswa..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
        aria-label="Cari siswa"
      />
    </div>
  );
}