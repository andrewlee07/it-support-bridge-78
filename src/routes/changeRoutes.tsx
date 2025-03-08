
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Changes from '@/pages/Changes';
import Releases from '@/pages/Releases';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const ChangeRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Change Management routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Changes />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/:id"
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
    </Routes>
  );
};
