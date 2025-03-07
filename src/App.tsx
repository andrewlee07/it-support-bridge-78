
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
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Routes accessible by all authenticated users */}
                    <Route path="/incidents" element={<Incidents />} />
                    <Route path="/service-requests" element={<ServiceRequests />} />
                    
                    {/* Admin and IT staff only routes */}
                    <Route element={<ProtectedRoute allowedRoles={['admin', 'it']} />}>
                      <Route path="/changes" element={<Changes />} />
                      <Route path="/assets" element={<Assets />} />
                      <Route path="/reports" element={<Reports />} />
                    </Route>
                    
                    {/* Admin only routes */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                      <Route path="/users" element={<Users />} />
                      <Route path="/settings/sla" element={<SLASettings />} />
                      <Route path="/settings" element={<NotFound />} />
                    </Route>
                    
                    <Route path="/help" element={<NotFound />} />
                  </Route>
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
