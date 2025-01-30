import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { ColumnVisibility, columns } from "./types";

interface ColumnVisibilityDropdownProps {
  columnVisibility: ColumnVisibility;
  onVisibilityChange: (key: keyof ColumnVisibility, checked: boolean) => void;
}

export function ColumnVisibilityDropdown({
  columnVisibility,
  onVisibilityChange,
}: ColumnVisibilityDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="w-4 h-4 mr-2" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {Object.entries(columns).map(([key, { label }]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={columnVisibility[key as keyof ColumnVisibility]}
            onCheckedChange={(checked) =>
              onVisibilityChange(key as keyof ColumnVisibility, checked)
            }
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}