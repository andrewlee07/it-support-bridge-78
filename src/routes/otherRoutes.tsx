
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Users from '@/pages/Users';
import Reports from '@/pages/Reports';
import ProblemManagement from '@/pages/ProblemManagement';
import Calendar from '@/pages/Calendar';
import Backlog from '@/pages/Backlog';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const OtherRoutes: React.FC = () => {
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
        {/* User Management route */}
        <Route 
          path="users" 
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <Users />
            </ProtectedRoute>
          } 
        />
        
        {/* Reporting route */}
        <Route 
          path="reports" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <Reports />
            </ProtectedRoute>
          } 
        />
        
        {/* Problem Management route */}
        <Route path="problem-management" element={<ProblemManagement />} />
        
        {/* Calendar route */}
        <Route path="calendar" element={<Calendar />} />
        
        {/* Backlog route */}
        <Route path="backlog" element={<Backlog />} />
      </Route>
    </Routes>
  );
};
