import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import IncidentsPage from '@/pages/IncidentsPage';
import IncidentDetail from '@/pages/IncidentDetail';
import CreateIncidentPage from '@/pages/CreateIncidentPage';
import EditIncidentPage from '@/pages/EditIncidentPage';
import ServiceRequestsPage from '@/pages/ServiceRequestsPage';
import ServiceRequestDetail from '@/pages/ServiceRequestDetail';
import CreateServiceRequestPage from '@/pages/CreateServiceRequestPage';
import EditServiceRequestPage from '@/pages/EditServiceRequestPage';
import ProblemsPage from '@/pages/ProblemsPage';
import ProblemDetailPage from '@/pages/ProblemDetailPage';
import CreateProblemPage from '@/pages/CreateProblemPage';
import EditProblemPage from '@/pages/EditProblemPage';
import KnownErrorsPage from '@/pages/KnownErrorsPage';
import KnowledgePage from '@/pages/KnowledgePage';
import KnowledgeArticlePage from '@/pages/KnowledgeArticlePage';
import CreateKnowledgeArticlePage from '@/pages/CreateKnowledgeArticlePage';
import ServiceCatalogPage from '@/pages/ServiceCatalogPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import ServiceManagementPage from '@/pages/ServiceManagementPage';
import AssetsPage from '@/pages/AssetsPage';
import AssetDetailPage from '@/pages/AssetDetailPage';
import CreateAssetPage from '@/pages/CreateAssetPage';
import EditAssetPage from '@/pages/EditAssetPage';
import ReportsPage from '@/pages/ReportsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ChangesPage from '@/pages/ChangesPage';
import ChangeRequestDetail from '@/pages/ChangeRequestDetail';
import CreateChangeRequestPage from '@/pages/CreateChangeRequestPage';
import EditChangeRequestPage from '@/pages/EditChangeRequestPage';
import CalendarPage from '@/pages/CalendarPage';
import ApprovalDashboardPage from '@/pages/ApprovalDashboardPage';
import SettingsPage from '@/pages/SettingsPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminSLASettings from '@/pages/AdminSLASettings';
import AdminStatusSynchronization from '@/pages/AdminStatusSynchronization';
import AdminAutoCloseSettings from '@/pages/AdminAutoCloseSettings';
import AdminBusinessHoursSettings from '@/pages/AdminBusinessHoursSettings';
import AdminNotificationSettings from '@/pages/AdminNotificationSettings';
import AdminNotificationTemplates from '@/pages/AdminNotificationTemplates';
import AdminDropdownConfig from '@/pages/AdminDropdownConfig';
import AdminErrorLogsPage from '@/pages/AdminErrorLogsPage';
import AdminApiKeysPage from '@/pages/AdminApiKeysPage';
import AdminSecuritySettingsPage from '@/pages/AdminSecuritySettingsPage';
import NotificationsPage from '@/pages/NotificationsPage';
import NotificationConsole from '@/pages/NotificationConsole';
import ProfilePage from '@/pages/ProfilePage';
import ReleasesPage from '@/pages/ReleasesPage';
import ReleaseDetailPage from '@/pages/ReleaseDetailPage';
import CreateReleasePage from '@/pages/CreateReleasePage';
import EditReleasePage from '@/pages/EditReleasePage';
import BacklogPage from '@/pages/BacklogPage';
import BacklogItemDetailPage from '@/pages/BacklogItemDetailPage';
import CreateBacklogItemPage from '@/pages/CreateBacklogItemPage';
import EditBacklogItemPage from '@/pages/EditBacklogItemPage';
import TestManagementPage from '@/pages/TestManagementPage';
import TestCasesPage from '@/pages/TestCasesPage';
import TestCaseDetailPage from '@/pages/TestCaseDetailPage';
import CreateTestCasePage from '@/pages/CreateTestCasePage';
import EditTestCasePage from '@/pages/EditTestCasePage';
import TestExecutionPage from '@/pages/TestExecutionPage';
import BugsPage from '@/pages/BugsPage';
import BugDetailPage from '@/pages/BugDetailPage';
import CreateBugPage from '@/pages/CreateBugPage';
import EditBugPage from '@/pages/EditBugPage';
import ChangeRiskSettings from '@/pages/ChangeRiskSettings';
import UserManagementPage from '@/pages/UserManagementPage';
import TasksPage from '@/pages/TasksPage';
import TaskDashboard from '@/pages/TaskDashboard';
import TaskDetailPage from '@/pages/TaskDetailPage';
import CreateTaskPage from '@/pages/CreateTaskPage';
import EditTaskPage from '@/pages/EditTaskPage';
import AdminMFASettingsPage from '@/pages/AdminMFASettingsPage';

// Initialize QueryClient once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Incidents */}
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/incidents/:incidentId" element={<IncidentDetail />} />
        <Route path="/incidents/create" element={<CreateIncidentPage />} />
        <Route path="/incidents/edit/:incidentId" element={<EditIncidentPage />} />
        
        {/* Service Requests */}
        <Route path="/service-requests" element={<ServiceRequestsPage />} />
        <Route path="/service-requests/:requestId" element={<ServiceRequestDetail />} />
        <Route path="/service-requests/create" element={<CreateServiceRequestPage />} />
        <Route path="/service-requests/edit/:requestId" element={<EditServiceRequestPage />} />
        
        {/* Problems */}
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:problemId" element={<ProblemDetailPage />} />
        <Route path="/problems/create" element={<CreateProblemPage />} />
        <Route path="/problems/edit/:problemId" element={<EditProblemPage />} />
        <Route path="/problems/known-errors" element={<KnownErrorsPage />} />
        
        {/* Changes */}
        <Route path="/changes" element={<ChangesPage />} />
        <Route path="/changes/:changeId" element={<ChangeRequestDetail />} />
        <Route path="/changes/create" element={<CreateChangeRequestPage />} />
        <Route path="/changes/edit/:changeId" element={<EditChangeRequestPage />} />
        
        {/* Tasks */}
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/dashboard" element={<TaskDashboard />} />
        <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
        <Route path="/tasks/create" element={<CreateTaskPage />} />
        <Route path="/tasks/edit/:taskId" element={<EditTaskPage />} />
        
        {/* Knowledge */}
        <Route path="/knowledge" element={<KnowledgePage />} />
        <Route path="/knowledge/article/:articleId" element={<KnowledgeArticlePage />} />
        <Route path="/knowledge/create" element={<CreateKnowledgeArticlePage />} />
        
        {/* Asset Management */}
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/assets/:assetId" element={<AssetDetailPage />} />
        <Route path="/assets/create" element={<CreateAssetPage />} />
        <Route path="/assets/edit/:assetId" element={<EditAssetPage />} />
        
        {/* Service Catalog */}
        <Route path="/services" element={<ServiceCatalogPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/services/management" element={<ServiceManagementPage />} />
        
        {/* Calendar */}
        <Route path="/calendar" element={<CalendarPage />} />
        
        {/* My Approvals */}
        <Route path="/approvals" element={<ApprovalDashboardPage />} />
        
        {/* Releases */}
        <Route path="/releases" element={<ReleasesPage />} />
        <Route path="/releases/:releaseId" element={<ReleaseDetailPage />} />
        <Route path="/releases/create" element={<CreateReleasePage />} />
        <Route path="/releases/edit/:releaseId" element={<EditReleasePage />} />
        
        {/* Backlog */}
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/backlog/:itemId" element={<BacklogItemDetailPage />} />
        <Route path="/backlog/create" element={<CreateBacklogItemPage />} />
        <Route path="/backlog/edit/:itemId" element={<EditBacklogItemPage />} />
        
        {/* Test Management */}
        <Route path="/testing" element={<TestManagementPage />} />
        <Route path="/testing/cases" element={<TestCasesPage />} />
        <Route path="/testing/cases/:caseId" element={<TestCaseDetailPage />} />
        <Route path="/testing/cases/create" element={<CreateTestCasePage />} />
        <Route path="/testing/cases/edit/:caseId" element={<EditTestCasePage />} />
        <Route path="/testing/execution/:cycleId" element={<TestExecutionPage />} />
        
        {/* Bug Tracking */}
        <Route path="/bugs" element={<BugsPage />} />
        <Route path="/bugs/:bugId" element={<BugDetailPage />} />
        <Route path="/bugs/create" element={<CreateBugPage />} />
        <Route path="/bugs/edit/:bugId" element={<EditBugPage />} />
        
        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Reports */}
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/:category" element={<ReportsPage />} />
        
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/sla" element={<AdminSLASettings />} />
        <Route path="/admin/status-sync" element={<AdminStatusSynchronization />} />
        <Route path="/admin/auto-close" element={<AdminAutoCloseSettings />} />
        <Route path="/admin/business-hours" element={<AdminBusinessHoursSettings />} />
        <Route path="/admin/notifications" element={<AdminNotificationSettings />} />
        <Route path="/admin/notification-templates" element={<AdminNotificationTemplates />} />
        <Route path="/admin/dropdown-config" element={<AdminDropdownConfig />} />
        <Route path="/admin/error-logs" element={<AdminErrorLogsPage />} />
        <Route path="/admin/api-keys" element={<AdminApiKeysPage />} />
        <Route path="/admin/security" element={<AdminSecuritySettingsPage />} />
        <Route path="/admin/mfa" element={<AdminMFASettingsPage />} />
        <Route path="/admin/change-risk" element={<ChangeRiskSettings />} />
        
        {/* Notifications */}
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/notification-console" element={<NotificationConsole />} />
        
        {/* User Management */}
        <Route path="/user-management" element={<UserManagementPage />} />
        
        {/* 404 - Keep this at the end */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default AppRoutes;
