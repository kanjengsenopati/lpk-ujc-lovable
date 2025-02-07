
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface KumiaiHeaderProps {
  onAdd: () => void;
}

export function KumiaiHeader({ onAdd }: KumiaiHeaderProps) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Data Kumiai Agencies
        </h1>
        <p className="text-muted-foreground">
          Kelola data kumiai agency dengan mudah dan efisien
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Agency
        </Button>
      </div>
    </>
  );
}
