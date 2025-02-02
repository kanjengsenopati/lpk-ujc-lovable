import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, BookOpen, Building2, GraduationCap, Settings, Users, Briefcase } from "lucide-react";

const menuItems = [
  { 
    title: "Dashboard", 
    icon: BarChart3, 
    url: "/",
    description: "Overview of key metrics and statistics"
  },
  { 
    title: "Siswa", 
    icon: Users, 
    url: "/siswa",
    description: "Manage student information and records"
  },
  { 
    title: "Rekrutmen", 
    icon: BookOpen, 
    url: "/rekrutmen",
    description: "Handle recruitment processes and applications"
  },
  { 
    title: "Job Order", 
    icon: Briefcase, 
    url: "/job-order",
    description: "Track and manage job orders"
  },
  { 
    title: "Mitra LPK", 
    icon: Building2, 
    url: "/mitra",
    description: "Manage LPK partner relationships"
  },
  { 
    title: "Lulusan", 
    icon: GraduationCap, 
    url: "/lulusan",
    description: "Track graduate progress and placement"
  },
  { 
    title: "Pengaturan", 
    icon: Settings, 
    url: "/pengaturan",
    description: "System settings and configurations"
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="animate-sidebar-slide backdrop-blur-lg border-r border-white/10">
      <div className="py-6 px-4 animate-fade-in">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 animate-pulse-subtle flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold tracking-wide">Dashboard Cerdas</span>
        </div>
      </div>

      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs uppercase tracking-wider text-muted-foreground/70">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="relative py-2.5 px-6 transition-all duration-300 hover:translate-x-1 group"
                  >
                    <a href={item.url}>
                      <div className="absolute left-0 w-1 h-8 rounded-r-full bg-primary opacity-0 transform scale-y-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-y-100 group-data-[active=true]:opacity-100 group-data-[active=true]:scale-y-100" />
                      <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="ml-3 tracking-wide">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}