
import { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Calendar from "@/pages/Calendar";
import Reports from "@/pages/Reports";
import SecurityAuditLog from "@/pages/SecurityAuditLog";

// Using RouteObject instead of JSX elements in a .ts file
export const otherRoutes: RouteObject[] = [
  {
    path: "/reports",
    element: Reports,
  },
  {
    path: "/calendar",
    element: Calendar,
  },
  {
    path: "/security-audit-log",
    element: SecurityAuditLog,
  },
  {
    path: "*",
    element: NotFound,
  },
];
