import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SiswaHeaderProps {
  onAddClick: () => void;
}

export function SiswaHeader({ onAddClick }: SiswaHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Data Siswa</h1>
      <p className="text-muted-foreground">
        Kelola data siswa yang terdaftar dalam sistem
      </p>
    </div>
  );
}