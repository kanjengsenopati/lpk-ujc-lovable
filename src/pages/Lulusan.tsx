
import { AppSidebar } from "@/components/AppSidebar";
import { LulusanContent } from "@/components/lulusan/LulusanContent";
import { LulusanHeader } from "@/components/lulusan/LulusanHeader";

export default function Lulusan() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-8">
        <LulusanHeader />
        <LulusanContent />
      </main>
    </div>
  );
}
