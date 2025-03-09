import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Import routes
import dashboardRoutes from "./dashboardRoutes";
import ticketRoutes from "./ticketRoutes";
import changeRoutes from "./changeRoutes";
import assetRoutes from "./assetRoutes";
import adminRoutes from "./adminRoutes";
import testManagementRoutes from "./testManagementRoutes";
import { otherRoutes } from "./otherRoutes";

// Auth-related pages
import Login from "@/pages/Login";
import MFAVerification from "@/pages/MFAVerification";
import SecurityQuestionRecovery from "@/pages/SecurityQuestionRecovery";

// Other standalone pages
import NotFound from "@/pages/NotFound";
import ServiceCatalog from "@/pages/ServiceCatalog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/mfa-verification",
    element: <MFAVerification />,
  },
  {
    path: "/security-recovery",
    element: <SecurityQuestionRecovery />,
  },
  {
    element: <MainLayout />,
    children: [
      // Main routes within the authenticated layout
      ...dashboardRoutes,
      ...ticketRoutes,
      ...changeRoutes,
      ...assetRoutes,
      ...adminRoutes,
      ...testManagementRoutes,
      ...otherRoutes,
      {
        path: "/service-catalog",
        element: <ServiceCatalog />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
