import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StatCard } from "@/components/StatCard";
import { JobOrderChart } from "@/components/JobOrderChart";
import { Users, GraduationCap, Building2, Briefcase } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <SidebarTrigger />
          
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Siswa"
                value="1,234"
                icon={<Users className="w-8 h-8" />}
              />
              <StatCard
                title="Siswa Lulus"
                value="856"
                icon={<GraduationCap className="w-8 h-8" />}
              />
              <StatCard
                title="Mitra LPK"
                value="45"
                icon={<Building2 className="w-8 h-8" />}
              />
              <StatCard
                title="Job Order Selesai"
                value="436"
                icon={<Briefcase className="w-8 h-8" />}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <JobOrderChart />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;