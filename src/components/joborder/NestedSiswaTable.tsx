
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { Siswa } from "../siswa/types";

interface NestedSiswaTableProps {
  isOpen: boolean;
  onToggle: () => void;
  siswaData: Siswa[];
}

export function NestedSiswaTable({ isOpen, onToggle, siswaData }: NestedSiswaTableProps) {
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
    </>
  );
}
