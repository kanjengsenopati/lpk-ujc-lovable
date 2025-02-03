import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RekrutmenSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function RekrutmenSearch({ searchTerm, onSearchChange }: RekrutmenSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder="Cari rekrutmen..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-[300px] pl-8"
      />
    </div>
  );
}