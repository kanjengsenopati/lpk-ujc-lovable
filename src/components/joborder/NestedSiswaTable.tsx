
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

      {isOpen && (
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>ID Siswa</TableHead>
                <TableHead>Asal LPK</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {siswaData.map((siswa) => (
                <TableRow key={siswa.id}>
                  <TableCell>{siswa.nama}</TableCell>
                  <TableCell>{siswa.idSiswa}</TableCell>
                  <TableCell>{siswa.asalLpk}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(siswa)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <SiswaDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        siswa={selectedSiswa}
      />
    </>
  );
}
