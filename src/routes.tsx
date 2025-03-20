import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      
      {/* Change Management */}
      <Route path="/changes" element={<MainLayout><Changes /></MainLayout>} />
      <Route path="/changes/:id" element={<MainLayout><ChangeDetail /></MainLayout>} />
      <Route path="/changes/:id/edit" element={<MainLayout><EditChange /></MainLayout>} />
      <Route path="/changes/:id/reject" element={<MainLayout><RejectChange /></MainLayout>} />
      <Route path="/changes/:id/close" element={<MainLayout><CloseChange /></MainLayout>} />
      <Route path="/changes/new" element={<MainLayout><NewChange /></MainLayout>} />
      
      {/* Ticket routes */}
      <Route path="/incidents" element={<MainLayout><Incidents /></MainLayout>} />
      <Route path="/incidents/:id" element={<MainLayout><IncidentDetail /></MainLayout>} />
      <Route path="/incidents/create" element={<MainLayout><NewIncident /></MainLayout>} />
      <Route path="/incidents/edit/:id" element={<MainLayout><EditIncident /></MainLayout>} />

      <Route path="/service-requests" element={<MainLayout><ServiceRequests /></MainLayout>} />
      <Route path="/service-requests/:id" element={<MainLayout><ServiceRequestDetail /></MainLayout>} />
      <Route path="/service-requests/create" element={<MainLayout><NewServiceRequest /></MainLayout>} />
      <Route path="/service-requests/edit/:id" element={<MainLayout><EditServiceRequest /></MainLayout>} />

      {/* Problem Management routes */}
      <Route path="/problems" element={<MainLayout><Problems /></MainLayout>} />
      <Route path="/problems/:id" element={<MainLayout><ProblemDetail /></MainLayout>} />
      <Route path="/problems/create" element={<MainLayout><NewProblem /></MainLayout>} />
      <Route path="/problems/edit/:id" element={<MainLayout><EditProblem /></MainLayout>} />
      <Route path="/problems/known-errors" element={<MainLayout><KnownErrors /></MainLayout>} />

      {/* Task Management routes */}
      <Route path="/tasks" element={<MainLayout><Tasks /></MainLayout>} />
      <Route path="/tasks/dashboard" element={<MainLayout><TaskDashboard /></MainLayout>} />
      <Route path="/tasks/:id" element={<MainLayout><TaskDetail /></MainLayout>} />
      <Route path="/tasks/create" element={<MainLayout><NewTask /></MainLayout>} />
      <Route path="/tasks/edit/:id" element={<MainLayout><EditTask /></MainLayout>} />

      {/* Assets routes */}
      <Route path="/assets" element={<MainLayout><Assets /></MainLayout>} />
      <Route path="/assets/:id" element={<MainLayout><AssetDetail /></MainLayout>} />
      <Route path="/assets/create" element={<MainLayout><NewAsset /></MainLayout>} />
      <Route path="/assets/edit/:id" element={<MainLayout><EditAsset /></MainLayout>} />

      {/* Knowledge routes */}
      <Route path="/knowledge" element={<MainLayout><Knowledge /></MainLayout>} />
      <Route path="/knowledge/article/:id" element={<MainLayout><KnowledgeArticle /></MainLayout>} />
      <Route path="/knowledge/create" element={<MainLayout><NewKnowledgeArticle /></MainLayout>} />

      {/* Test Management routes */}
      <Route path="/testing" element={<MainLayout><Testing /></MainLayout>} />
      <Route path="/testing/cases" element={<MainLayout><TestCases /></MainLayout>} />
      <Route path="/testing/cases/:id" element={<MainLayout><TestCaseDetail /></MainLayout>} />
      <Route path="/testing/cases/create" element={<MainLayout><NewTestCase /></MainLayout>} />
      <Route path="/testing/cases/edit/:id" element={<MainLayout><EditTestCase /></MainLayout>} />
      <Route path="/testing/execution/:id" element={<MainLayout><TestExecution /></MainLayout>} />

      {/* Calendar */}
      <Route path="/calendar" element={<MainLayout><Calendar /></MainLayout>} />

      {/* Reports */}
      <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
      <Route path="/reports/:category" element={<MainLayout><ReportCategory /></MainLayout>} />

      {/* Portal routes */}
      <Route path="/portal" element={<MainLayout><Portal /></MainLayout>} />
      <Route path="/portal/my-approvals" element={<MainLayout><PortalApprovals /></MainLayout>} />
      <Route path="/portal/my-incidents" element={<MainLayout><PortalIncidents /></MainLayout>} />
      <Route path="/portal/my-requests" element={<MainLayout><PortalRequests /></MainLayout>} />

      {/* User Settings */}
      <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />

      {/* Admin routes */}
      <Route path="/admin" element={<MainLayout><Admin /></MainLayout>} />
      <Route path="/admin/sla" element={<MainLayout><AdminSLA /></MainLayout>} />
      <Route path="/admin/status-sync" element={<MainLayout><AdminStatusSync /></MainLayout>} />
      <Route path="/admin/change-risk" element={<MainLayout><AdminChangeRisk /></MainLayout>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
