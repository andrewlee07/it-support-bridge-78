
import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AdminSettings from '@/pages/AdminSettings';
import SLASettings from '@/pages/SLASettings';
import DropdownConfigurations from '@/pages/settings/DropdownConfigurations';
import RiskAssessment from '@/pages/settings/RiskAssessmentSettings';
import ErrorLogs from '@/pages/admin/ErrorLogs';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const AdminRoutes: React.FC = () => {
  return (
    <>
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
    </>
  );
};
