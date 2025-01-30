import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { bulan: "Jan", jumlah: 65 },
  { bulan: "Feb", jumlah: 59 },
  { bulan: "Mar", jumlah: 80 },
  { bulan: "Apr", jumlah: 81 },
  { bulan: "Mei", jumlah: 56 },
  { bulan: "Jun", jumlah: 55 },
  { bulan: "Jul", jumlah: 40 },
];

export function JobOrderChart() {
  return (
    <Card className="glass-card p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Job Order per Bulan</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="bulan" stroke="rgba(0,0,0,0.6)" />
            <YAxis stroke="rgba(0,0,0,0.6)" />
            <Tooltip 
              contentStyle={{ 
                background: "rgba(255,255,255,0.9)", 
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }} 
            />
            <Bar dataKey="jumlah" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}