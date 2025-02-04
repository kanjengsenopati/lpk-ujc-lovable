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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import type { Siswa } from "../siswa/types";

interface NestedSiswaTableProps {
  isOpen: boolean;
  onToggle: () => void;
  siswaData: Siswa[];
}

export function NestedSiswaTable({ isOpen, onToggle, siswaData }: NestedSiswaTableProps) {
  return (
    <div>
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
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="siswa-data">
              <AccordionContent className="pl-8 pr-4 py-4 bg-muted/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>Asal LPK</TableHead>
                      <TableHead>Tanggal Masuk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {siswaData && siswaData.length > 0 ? (
                      siswaData.map((siswa) => (
                        <TableRow key={siswa.id}>
                          <TableCell>{siswa.nama}</TableCell>
                          <TableCell>{siswa.asalLpk}</TableCell>
                          <TableCell>{siswa.tanggalMasuk}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
                          Tidak ada data siswa
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}