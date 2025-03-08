
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const AdminSettings = lazy(() => import('@/pages/AdminSettings'));
const ErrorLogs = lazy(() => import('@/pages/admin/ErrorLogs'));
const IncidentConfiguration = lazy(() => import('@/pages/admin/IncidentConfiguration'));
const ServiceRequestConfiguration = lazy(() => import('@/pages/admin/ServiceRequestConfiguration'));
// For now, these can redirect to AdminSettings
const SystemConfiguration = () => <Navigate to="/admin/settings" replace />;
const ChangeConfiguration = () => <Navigate to="/admin/settings" replace />;
const ProblemConfiguration = () => <Navigate to="/admin/settings" replace />;
const AssetConfiguration = () => <Navigate to="/admin/settings" replace />;

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin/settings',
    element: <AdminSettings />,
  },
  {
    path: '/admin/error-logs',
    element: <ErrorLogs />,
  },
  {
    path: '/admin/system-configuration',
    element: <SystemConfiguration />,
  },
  {
    path: '/admin/incident-configuration',
    element: <IncidentConfiguration />,
  },
  {
    path: '/admin/service-request-configuration',
    element: <ServiceRequestConfiguration />,
  },
  {
    path: '/admin/change-configuration',
    element: <ChangeConfiguration />,
  },
  {
    path: '/admin/problem-configuration',
    element: <ProblemConfiguration />,
  },
  {
    path: '/admin/asset-configuration',
    element: <AssetConfiguration />,
  },
];
