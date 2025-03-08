
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
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Changes />} />
        <Route path=":id" element={<Changes />} />
        <Route path="releases" element={<Releases />} />
        <Route path="releases/:id" element={<Releases />} />
      </Route>
    </Routes>
  );
};
