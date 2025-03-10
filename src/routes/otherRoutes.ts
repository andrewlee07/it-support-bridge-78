
import NotFound from "@/pages/NotFound";
import Calendar from "@/pages/Calendar";
import Reports from "@/pages/Reports";
import SecurityAuditLog from "@/pages/SecurityAuditLog";

export const otherRoutes = [
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/security-audit-log",
    element: <SecurityAuditLog />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
