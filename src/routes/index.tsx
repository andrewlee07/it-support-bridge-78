
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { TicketRoutes } from './ticketRoutes';
import { ChangeRoutes } from './changeRoutes';
import { AssetRoutes } from './assetRoutes';
import { AdminRoutes } from './adminRoutes';
import { TestManagementRoutes } from './testManagementRoutes';
import { OtherRoutes } from './otherRoutes';
import { DashboardRoutes } from './dashboardRoutes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Group all protected routes */}
      <TicketRoutes />
      <ChangeRoutes />
      <AssetRoutes />
      <TestManagementRoutes />
      <OtherRoutes />
      <AdminRoutes />
      <DashboardRoutes />
      
      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
