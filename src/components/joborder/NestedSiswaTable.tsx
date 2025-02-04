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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="siswa-data">
            <AccordionContent className="pl-8 pr-4 py-4 bg-muted/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Siswa</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {siswaData.map((siswa) => (
                    <TableRow key={siswa.id}>
                      <TableCell>{siswa.idSiswa}</TableCell>
                      <TableCell>{siswa.nama}</TableCell>
                      <TableCell>{siswa.email}</TableCell>
                      <TableCell>{siswa.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}