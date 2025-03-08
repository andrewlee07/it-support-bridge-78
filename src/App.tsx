
import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import ServiceRequests from "./pages/ServiceRequests";
import Changes from "./pages/Changes";
import NewChangeRequest from "./pages/NewChangeRequest";
import Releases from "./pages/Releases";
import NewRelease from "./pages/NewRelease";
import ReleaseDetail from "./pages/ReleaseDetail";
import Assets from "./pages/Assets";
import TestTracking from "./pages/TestTracking";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import SLASettings from "./pages/SLASettings";
import DropdownConfigurations from "./pages/settings/DropdownConfigurations";
import RiskAssessmentSettings from "./pages/settings/RiskAssessmentSettings";
import Backlog from "./pages/Backlog";

import { ThemeProvider } from "./components/ui/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  useEffect(() => {
    document.title = "ITSM Portal";
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute redirectPath="/login">
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute redirectPath="/login">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="service-requests" element={<ServiceRequests />} />
          <Route path="changes" element={<Changes />} />
          <Route path="changes/new" element={<NewChangeRequest />} />
          <Route path="changes/edit/:id" element={<NewChangeRequest />} />
          <Route path="releases" element={<Releases />} />
          <Route path="releases/new" element={<NewRelease />} />
          <Route path="releases/edit/:id" element={<NewRelease />} />
          <Route path="releases/:id" element={<ReleaseDetail />} />
          <Route path="backlog" element={<Backlog />} />
          <Route path="assets" element={<Assets />} />
          <Route path="test-tracking" element={<TestTracking />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          
          {/* Settings */}
          <Route path="settings/sla" element={<SLASettings />} />
          <Route path="settings/dropdown-configurations" element={<DropdownConfigurations />} />
          <Route path="settings/risk-assessment" element={<RiskAssessmentSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="theme-mode">
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
