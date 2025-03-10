
import { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Calendar from "@/pages/Calendar";
import Reports from "@/pages/Reports";
import SecurityAuditLog from "@/pages/SecurityAuditLog";
import UserManagementPage from "@/pages/UserManagementPage";
import React from "react";

export const otherRoutes: RouteObject[] = [
  {
    path: "/reports",
    element: React.createElement(Reports),
  },
  {
    path: "/calendar",
    element: React.createElement(Calendar),
  },
  {
    path: "/security-audit-log",
    element: React.createElement(SecurityAuditLog),
  },
  {
    path: "/user-management",
    element: React.createElement(UserManagementPage),
  },
  {
    path: "*",
    element: React.createElement(NotFound),
  },
];
