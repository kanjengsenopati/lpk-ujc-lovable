
import { ChevronDown, ChevronRight, Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import type { Siswa } from "../siswa/types";
import { SiswaDetailModal } from "./SiswaDetailModal";

interface NestedSiswaTableProps {
  isOpen: boolean;
  onToggle: () => void;
  siswaData: Siswa[];
}

export function NestedSiswaTable({ isOpen, onToggle, siswaData }: NestedSiswaTableProps) {
  const [selectedSiswa, setSelectedSiswa] = useState<Siswa | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetails = (siswa: Siswa) => {
    setSelectedSiswa(siswa);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="h-4 w-4 p-0"
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <SiswaDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        siswa={selectedSiswa}
      />
    </>
  );
}
