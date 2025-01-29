import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, BookOpen, Building2, GraduationCap, Settings, Users, Briefcase } from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: BarChart3, url: "/" },
  { title: "Siswa", icon: Users, url: "/siswa" },
  { title: "Rekrutmen", icon: BookOpen, url: "/rekrutmen" },
  { title: "Job Order", icon: Briefcase, url: "/job-order" },
  { title: "Mitra LPK", icon: Building2, url: "/mitra" },
  { title: "Lulusan", icon: GraduationCap, url: "/lulusan" },
  { title: "Pengaturan", icon: Settings, url: "/pengaturan" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
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