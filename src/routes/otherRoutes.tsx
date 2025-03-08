
import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Users from '@/pages/Users';
import Reports from '@/pages/Reports';
import ProblemManagement from '@/pages/ProblemManagement';
import Calendar from '@/pages/Calendar';
import Backlog from '@/pages/Backlog';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const OtherRoutes: React.FC = () => {
  return (
    <>
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
    </>
  );
};
