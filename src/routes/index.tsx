
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import Changes from '@/pages/Changes';
import Releases from '@/pages/Releases';
import Assets from '@/pages/Assets';
import Users from '@/pages/Users';
import Reports from '@/pages/Reports';
import AdminSettings from '@/pages/AdminSettings';
import SLASettings from '@/pages/SLASettings';
import DropdownConfigurations from '@/pages/settings/DropdownConfigurations';
import RiskAssessment from '@/pages/settings/RiskAssessmentSettings';
import TestTracking from '@/pages/TestTracking';
import TestExecution from '@/pages/TestExecution';
import Bugs from '@/pages/Bugs';
import ProblemManagement from '@/pages/ProblemManagement';
import Calendar from '@/pages/Calendar';
import Backlog from '@/pages/Backlog';
import ErrorLogs from '@/pages/admin/ErrorLogs';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard route */}
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
      
      {/* Incident Management routes */}
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
        path="/service-requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ServiceRequests />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Change Management routes */}
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
        path="/releases"
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Releases />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Asset Management route */}
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
      
      {/* User Management route */}
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
      
      {/* Reporting route */}
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
      
      {/* Settings routes */}
      <Route
        path="/settings/sla"
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <SLASettings />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings/dropdown-configurations"
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <DropdownConfigurations />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings/risk-assessment"
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <RiskAssessment />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Test Management routes */}
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
      
      {/* Problem Management route */}
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
      
      {/* Calendar route */}
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
      
      {/* Backlog route */}
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
      
      {/* Admin routes */}
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <AdminSettings />
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
      
      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
