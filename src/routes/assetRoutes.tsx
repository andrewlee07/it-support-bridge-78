
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Assets from '@/pages/Assets';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const AssetRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Asset Management routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/:id"
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
