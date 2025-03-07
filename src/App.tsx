
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import ServiceRequests from "./pages/ServiceRequests";
import Users from "./pages/Users";
import MainLayout from "./layouts/MainLayout";
import SLASettings from "./pages/SLASettings";
import Changes from "./pages/Changes";
import Assets from "./pages/Assets";
import Reports from "./pages/Reports";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/service-requests" element={<ServiceRequests />} />
                <Route path="/users" element={<Users />} />
                <Route path="/changes" element={<Changes />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings/sla" element={<SLASettings />} />
                {/* These routes would be implemented in future iterations */}
                <Route path="/settings" element={<NotFound />} />
                <Route path="/help" element={<NotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
