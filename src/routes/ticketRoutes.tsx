
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

interface TicketRoutesProps {
  type: 'incident' | 'service';
}

export const TicketRoutes: React.FC<TicketRoutesProps> = ({ type }) => {
  return (
    <ProtectedRoute>
      <MainLayout>
        {type === 'incident' ? (
          <Routes>
            <Route path="/" element={<Incidents />} />
            <Route path="/:id" element={<Incidents />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<ServiceRequests />} />
            <Route path="/:id" element={<ServiceRequests />} />
          </Routes>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
};
