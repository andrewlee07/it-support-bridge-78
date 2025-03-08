
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Assets from '@/pages/Assets';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const AssetRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Assets />} />
        <Route path=":id" element={<Assets />} />
      </Route>
    </Routes>
  );
};
