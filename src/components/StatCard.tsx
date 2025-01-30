import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <Card 
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:scale-105 hover:bg-white/[0.15] group", 
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className="text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </Card>
  );
}