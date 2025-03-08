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
    </Routes>
  );
};
