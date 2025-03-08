
import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Assets from '@/pages/Assets';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const AssetRoutes: React.FC = () => {
  return (
    <>
      {/* Asset Management routes */}
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
    </>
  );
};
