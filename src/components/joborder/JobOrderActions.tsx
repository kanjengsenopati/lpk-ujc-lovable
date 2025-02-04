import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface JobOrderActionsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function JobOrderActions({
  searchTerm,
  onSearchChange,
  onAddClick,
}: JobOrderActionsProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari job order..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[300px] pl-8"
          />
        </div>
      </div>
      <Button onClick={onAddClick}>
        <Plus className="w-4 h-4" />
        Tambah Job Order
      </Button>
    </div>
  );
}