
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
