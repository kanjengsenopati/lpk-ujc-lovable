
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Siswa from "./pages/Siswa";
import Rekrutmen from "./pages/Rekrutmen";
import JobOrder from "./pages/JobOrder";
import Mitra from "./pages/Mitra";
import Lulusan from "./pages/Lulusan";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/siswa" element={<Siswa />} />
              <Route path="/rekrutmen" element={<Rekrutmen />} />
              <Route path="/job-order" element={<JobOrder />} />
              <Route path="/mitra" element={<Mitra />} />
              <Route path="/lulusan" element={<Lulusan />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
