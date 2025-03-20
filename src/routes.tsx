
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Changes from './pages/Changes';
import ChangeDetail from './pages/ChangeDetail';
import NewChange from './pages/NewChange';
import EditChange from './pages/EditChange';
import RejectChange from './pages/RejectChange';
import CloseChange from './pages/CloseChange';
import Incidents from './pages/Incidents';
import IncidentDetail from './pages/IncidentDetail';
import NewIncident from './pages/NewIncident';
import EditIncident from './pages/EditIncident';
import ServiceRequests from './pages/ServiceRequests';
import ServiceRequestDetail from './pages/ServiceRequestDetail';
import NewServiceRequest from './pages/NewServiceRequest';
import EditServiceRequest from './pages/EditServiceRequest';
import Problems from './pages/Problems';
import ProblemDetail from './pages/ProblemDetail';
import NewProblem from './pages/NewProblem';
import EditProblem from './pages/EditProblem';
import KnownErrors from './pages/KnownErrors';
import Tasks from './pages/Tasks';
import TaskDashboard from './pages/TaskDashboard';
import TaskDetail from './pages/TaskDetail';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import Assets from './pages/Assets';
import AssetDetail from './pages/AssetDetail';
import NewAsset from './pages/NewAsset';
import EditAsset from './pages/EditAsset';
import Knowledge from './pages/Knowledge';
import KnowledgeArticle from './pages/KnowledgeArticle';
import NewKnowledgeArticle from './pages/NewKnowledgeArticle';
import Testing from './pages/Testing';
import TestCases from './pages/TestCases';
import TestTracking from './pages/TestTracking'; // Add import for TestTracking
import TestCaseDetail from './pages/TestCaseDetail';
import NewTestCase from './pages/NewTestCase';
import EditTestCase from './pages/EditTestCase';
import TestExecution from './pages/TestExecution';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import ReportCategory from './pages/ReportCategory';
import Portal from './pages/Portal';
import PortalApprovals from './pages/PortalApprovals';
import PortalIncidents from './pages/PortalIncidents';
import PortalRequests from './pages/PortalRequests';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminSLA from './pages/AdminSLA';
import AdminStatusSync from './pages/AdminStatusSync';
import AdminChangeRisk from './pages/AdminChangeRisk';
import { ProtectedRoute } from './routes/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/login",
    element: <AuthLayout><Login /></AuthLayout>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>
  },
  // Change Management
  {
    path: "/changes",
    element: <ProtectedRoute><MainLayout><Changes /></MainLayout></ProtectedRoute>
  },
  {
    path: "/changes/:id",
    element: <ProtectedRoute><MainLayout><ChangeDetail /></MainLayout></ProtectedRoute>
  },
  {
    path: "/changes/:id/edit",
    element: <ProtectedRoute><MainLayout><EditChange /></MainLayout></ProtectedRoute>
  },
  {
    path: "/changes/:id/reject",
    element: <ProtectedRoute><MainLayout><RejectChange /></MainLayout></ProtectedRoute>
  },
  {
    path: "/changes/:id/close",
    element: <ProtectedRoute><MainLayout><CloseChange /></MainLayout></ProtectedRoute>
  },
  {
    path: "/changes/new",
    element: <ProtectedRoute><MainLayout><NewChange /></MainLayout></ProtectedRoute>
  },
  // Ticket routes
  {
    path: "/incidents",
    element: <ProtectedRoute><MainLayout><Incidents /></MainLayout></ProtectedRoute>
  },
  {
    path: "/incidents/:id",
    element: <ProtectedRoute><MainLayout><IncidentDetail /></MainLayout></ProtectedRoute>
  },
  {
    path: "/incidents/create",
    element: <ProtectedRoute><MainLayout><NewIncident /></MainLayout></ProtectedRoute>
  },
  {
    path: "/incidents/edit/:id",
    element: <ProtectedRoute><MainLayout><EditIncident /></MainLayout></ProtectedRoute>
  },
  {
    path: "/service-requests",
    element: <ProtectedRoute><MainLayout><ServiceRequests /></MainLayout></ProtectedRoute>
  },
  {
    path: "/service-requests/:id",
    element: <ProtectedRoute><MainLayout><ServiceRequestDetail /></MainLayout></ProtectedRoute>
  },
  {
    path: "/service-requests/create",
    element: <ProtectedRoute><MainLayout><NewServiceRequest /></MainLayout></ProtectedRoute>
  },
  {
    path: "/service-requests/edit/:id",
    element: <ProtectedRoute><MainLayout><EditServiceRequest /></MainLayout></ProtectedRoute>
  },
  // Problem Management routes
  {
    path: "/problems",
    element: <ProtectedRoute><MainLayout><Problems /></MainLayout></ProtectedRoute>
  },
  {
    path: "/problems/:id",
    element: <ProtectedRoute><MainLayout><ProblemDetail /></MainLayout></ProtectedRoute>
  },
  {
    path: "/problems/create",
    element: <ProtectedRoute><MainLayout><NewProblem /></MainLayout></ProtectedRoute>
  },
  {
    path: "/problems/edit/:id",
    element: <ProtectedRoute><MainLayout><EditProblem /></MainLayout></ProtectedRoute>
  },
  {
    path: "/problems/known-errors",
    element: <ProtectedRoute><MainLayout><KnownErrors /></MainLayout></ProtectedRoute>
  },
  // Task Management routes
  {
    path: "/tasks",
    element: <ProtectedRoute><MainLayout><Tasks /></MainLayout></ProtectedRoute>
  },
  {
    path: "/tasks/dashboard",
    element: <ProtectedRoute><MainLayout><TaskDashboard /></MainLayout></ProtectedRoute>
  },
  {
    path: "/tasks/:id",
    element: <ProtectedRoute><MainLayout><TaskDetail /></MainLayout></ProtectedRoute>
  },
  {
    path: "/tasks/create",
    element: <ProtectedRoute><MainLayout><NewTask /></MainLayout></ProtectedRoute>
  },
  {
    path: "/tasks/edit/:id",
    element: <ProtectedRoute><MainLayout><EditTask /></MainLayout></ProtectedRoute>
  },
  // Assets routes
  {
    path: "/assets",
    element: <ProtectedRoute><MainLayout><Assets /></MainLayout></ProtectedRoute>
  },
  {
    path: "/assets/:id",
    element: <ProtectedRoute><MainLayout><AssetDetail /></MainLayout></ProtectedRoute>
  },
  {
    path: "/assets/create",
    element: <ProtectedRoute><MainLayout><NewAsset /></MainLayout></ProtectedRoute>
  },
  {
    path: "/assets/edit/:id",
    element: <ProtectedRoute><MainLayout><EditAsset /></MainLayout></ProtectedRoute>
  },
  // Knowledge routes
  {
    path: "/knowledge",
    element: <ProtectedRoute><MainLayout><Knowledge /></MainLayout></ProtectedRoute>
  },
  {
    path: "/knowledge/article/:id",
    element: <ProtectedRoute><MainLayout><KnowledgeArticle /></MainLayout></ProtectedRoute>
  },
  {
    path: "/knowledge/create",
    element: <ProtectedRoute><MainLayout><NewKnowledgeArticle /></MainLayout></ProtectedRoute>
  },
  // Test Management routes
  {
    path: "/testing",
    element: <ProtectedRoute><MainLayout><Testing /></MainLayout></ProtectedRoute>
  },
  {
    path: "/test-tracking",
    element: <ProtectedRoute><MainLayout><TestTracking /></MainLayout></ProtectedRoute>
  },
  {
    path: "/testing/cases",
    element: <ProtectedRoute><MainLayout><TestCases /></MainLayout></ProtectedRoute>
  },
  {
    path: "/testing/cases/:id",
    element: <ProtectedRoute><MainLayout><TestCaseDetail /></MainLayout></ProtectedRoute>
  },
  {
    path: "/testing/cases/create",
    element: <ProtectedRoute><MainLayout><NewTestCase /></MainLayout></ProtectedRoute>
  },
  {
    path: "/testing/cases/edit/:id",
    element: <ProtectedRoute><MainLayout><EditTestCase /></MainLayout></ProtectedRoute>
  },
  {
    path: "/testing/execution/:id",
    element: <ProtectedRoute><MainLayout><TestExecution /></MainLayout></ProtectedRoute>
  },
  // Calendar
  {
    path: "/calendar",
    element: <ProtectedRoute><MainLayout><Calendar /></MainLayout></ProtectedRoute>
  },
  // Reports
  {
    path: "/reports",
    element: <ProtectedRoute><MainLayout><Reports /></MainLayout></ProtectedRoute>
  },
  {
    path: "/reports/:category",
    element: <ProtectedRoute><MainLayout><ReportCategory /></MainLayout></ProtectedRoute>
  },
  // Portal routes
  {
    path: "/portal",
    element: <ProtectedRoute><MainLayout><Portal /></MainLayout></ProtectedRoute>
  },
  {
    path: "/portal/my-approvals",
    element: <ProtectedRoute><MainLayout><PortalApprovals /></MainLayout></ProtectedRoute>
  },
  {
    path: "/portal/my-incidents",
    element: <ProtectedRoute><MainLayout><PortalIncidents /></MainLayout></ProtectedRoute>
  },
  {
    path: "/portal/my-requests",
    element: <ProtectedRoute><MainLayout><PortalRequests /></MainLayout></ProtectedRoute>
  },
  // User Settings
  {
    path: "/settings",
    element: <ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>
  },
  {
    path: "/profile",
    element: <ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>
  },
  // Admin routes
  {
    path: "/admin",
    element: <ProtectedRoute><MainLayout><Admin /></MainLayout></ProtectedRoute>
  },
  {
    path: "/admin/sla",
    element: <ProtectedRoute><MainLayout><AdminSLA /></MainLayout></ProtectedRoute>
  },
  {
    path: "/admin/status-sync",
    element: <ProtectedRoute><MainLayout><AdminStatusSync /></MainLayout></ProtectedRoute>
  },
  {
    path: "/admin/change-risk",
    element: <ProtectedRoute><MainLayout><AdminChangeRisk /></MainLayout></ProtectedRoute>
  },
  // Catch-all route (not found)
  {
    path: "*",
    element: <Index />
  }
]);

export default router;
