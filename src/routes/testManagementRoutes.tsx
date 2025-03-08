
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import TestTracking from '@/pages/TestTracking';
import TestExecution from '@/pages/TestExecution';
import Bugs from '@/pages/Bugs';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const TestManagementRoutes: React.FC = () => {
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
        {/* Test Management routes */}
        <Route path="test-tracking" element={<TestTracking />} />
        <Route path="test-execution" element={<TestExecution />} />
        <Route path="bugs" element={<Bugs />} />
      </Route>
    </Routes>
  );
};
