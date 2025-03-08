import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import Changes from '@/pages/Changes';
import Releases from '@/pages/Releases';
import Assets from '@/pages/Assets';
import TestTracking from '@/pages/TestTracking';
import TestExecution from '@/pages/TestExecution';
import Bugs from '@/pages/Bugs';
import Users from '@/pages/Users';
import Reports from '@/pages/Reports';
import ProblemManagement from '@/pages/ProblemManagement';
import Calendar from '@/pages/Calendar';
import Backlog from '@/pages/Backlog';
import AdminSettings from '@/pages/AdminSettings';

import IncidentConfiguration from '@/pages/admin/IncidentConfiguration';
import ServiceRequestConfiguration from '@/pages/admin/ServiceRequestConfiguration';
import ChangeConfiguration from '@/pages/admin/ChangeConfiguration';
import ProblemConfiguration from '@/pages/admin/ProblemConfiguration';
import AssetConfiguration from '@/pages/admin/AssetConfiguration';
import SLASettings from '@/pages/admin/SLASettings';
import ErrorLogs from '@/pages/admin/ErrorLogs';
import SecuritySettings from '@/components/admin/SecuritySettings';
import ConfigurationSettings from '@/components/admin/ConfigurationSettings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/incidents" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Incidents />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/incidents/:id" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Incidents />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/service-requests" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <ServiceRequests />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/service-requests/:id" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <ServiceRequests />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/changes" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Changes />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/changes/:id" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Changes />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/releases" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Releases />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/releases/:id" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Releases />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/assets" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/assets/:id" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/test-tracking" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <TestTracking />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/test-execution" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <TestExecution />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bugs" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Bugs />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/users" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <Users />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/problem-management" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProblemManagement />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/calendar" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Calendar />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/backlog" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Backlog />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <AdminSettings />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/system-configuration" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <ConfigurationSettings />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/security-settings" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <SecuritySettings />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/error-logs" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <ErrorLogs />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/incident-configuration" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <IncidentConfiguration />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/service-request-configuration" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <ServiceRequestConfiguration />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/change-configuration" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <ChangeConfiguration />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/problem-configuration" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <ProblemConfiguration />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/asset-configuration" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <AssetConfiguration />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/sla-settings" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <SLASettings />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings/sla" 
        element={<Navigate to="/admin/sla-settings" replace />} 
      />
      
      <Route 
        path="/settings/dropdown-configurations" 
        element={<Navigate to="/admin" replace />} 
      />
      
      <Route 
        path="/settings/risk-assessment" 
        element={<Navigate to="/admin/change-configuration" replace />} 
      />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
