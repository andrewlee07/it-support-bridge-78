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
      
      {/* Include all route groups */}
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/incidents/*" element={<TicketRoutes type="incident" />} />
      <Route path="/service-requests/*" element={<TicketRoutes type="service" />} />
      <Route path="/changes/*" element={<ChangeRoutes />} />
      <Route path="/releases/*" element={<ChangeRoutes />} />
      <Route path="/assets/*" element={<AssetRoutes />} />
      <Route path="/test-*/*" element={<TestManagementRoutes />} />
      <Route path="/bugs/*" element={<TestManagementRoutes />} />
      <Route path="/users/*" element={<OtherRoutes />} />
      <Route path="/reports/*" element={<OtherRoutes />} />
      <Route path="/problem-management/*" element={<OtherRoutes />} />
      <Route path="/calendar/*" element={<OtherRoutes />} />
      <Route path="/backlog/*" element={<OtherRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/settings/*" element={<AdminRoutes />} />
      
      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
