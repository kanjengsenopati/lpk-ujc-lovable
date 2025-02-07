
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

const Projects = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <SidebarTrigger />
        </div>
        
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            Project Management
          </h1>
          
          <KanbanBoard />
        </div>
      </main>
    </div>
  );
};

export default Projects;
