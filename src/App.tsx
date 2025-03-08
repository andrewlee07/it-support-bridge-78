
import { Suspense, useEffect, useState } from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Errors from "./pages/Errors";
import Settings from "./pages/Settings";
import Releases from "./pages/Releases";
import Assets from "./pages/Assets";
import NewRelease from "./pages/NewRelease";
import ReleaseDetail from "./pages/ReleaseDetail";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthLayout from "./components/auth/AuthLayout";
import Backlog from "./pages/Backlog";
import BacklogKanban from "./pages/BacklogKanban";
import Changes from "./pages/Changes";
import NewChange from "./pages/NewChange";
import RiskAssessmentConfiguration from "./pages/admin/RiskAssessmentConfiguration";
import ChangeDropdowns from "./pages/admin/ChangeDropdowns";
import ErrorLogs from "./pages/admin/ErrorLogs";
import SLAConfiguration from "./pages/admin/SLAConfiguration";
import SecuritySettings from "./pages/admin/SecuritySettings";
import StatusSynchronizationSettings from "./pages/StatusSynchronizationSettings";
import testManagementRoutes from "./routes/testManagementRoutes";
import testCoverageRoutes from "./routes/testCoverageRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

import BugDetail from "./pages/BugDetail";
import { useSessionTimeout } from "./hooks/useSessionTimeout";
import { useAuth } from "./contexts/auth";
import { Toaster } from "sonner";

function App() {
  const { initializeSessionTimeout } = useSessionTimeout();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      initializeSessionTimeout();
    }
  }, [isAuthenticated, initializeSessionTimeout]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout>
            <Outlet />
          </Layout>
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "changes",
          element: <Changes />,
        },
        {
          path: "changes/new",
          element: <NewChange />,
        },
        {
          path: "releases",
          element: <Releases />,
        },
        {
          path: "releases/new",
          element: <NewRelease />,
        },
        {
          path: "releases/:id",
          element: <ReleaseDetail />,
        },
        {
          path: "backlog",
          element: <Backlog />,
        },
        {
          path: "backlog/kanban",
          element: <BacklogKanban />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "assets",
          element: <Assets />,
        },
        {
          path: "errors",
          element: <Errors />,
        },
        ...testManagementRoutes,
        ...testCoverageRoutes,
        ...dashboardRoutes,
        {
          path: "admin",
          children: [
            {
              path: "risk-assessment",
              element: <RiskAssessmentConfiguration />,
            },
            {
              path: "change-dropdowns",
              element: <ChangeDropdowns />,
            },
            {
              path: "error-logs",
              element: <ErrorLogs />,
            },
            {
              path: "sla-configuration",
              element: <SLAConfiguration />,
            },
            {
              path: "security-settings",
              element: <SecuritySettings />,
            },
            {
              path: "status-synchronization",
              element: <StatusSynchronizationSettings />,
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
