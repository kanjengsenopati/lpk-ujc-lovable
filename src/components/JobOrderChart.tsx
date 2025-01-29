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
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Job Order per Bulan</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jumlah" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}