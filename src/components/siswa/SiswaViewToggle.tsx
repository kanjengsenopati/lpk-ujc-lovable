import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

interface SiswaViewToggleProps {
  viewMode: "table" | "grid";
  onViewChange: (mode: "table" | "grid") => void;
}

export function SiswaViewToggle({ viewMode, onViewChange }: SiswaViewToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => onViewChange("table")}
        className={viewMode === "table" ? "bg-accent" : ""}
        aria-label="Tampilan tabel"
        aria-pressed={viewMode === "table"}
      >
        <List className="w-4 h-4 mr-2" />
        Tabel
      </Button>
      <Button
        variant="outline"
        onClick={() => onViewChange("grid")}
        className={viewMode === "grid" ? "bg-accent" : ""}
        aria-label="Tampilan grid"
        aria-pressed={viewMode === "grid"}
      >
        <Grid className="w-4 h-4 mr-2" />
        Grid
      </Button>
    </div>
  );
}