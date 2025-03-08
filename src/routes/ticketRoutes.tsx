
import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const TicketRoutes: React.FC = () => {
  return (
    <>
      {/* Incident Management routes */}
      <Route
        path="/incidents"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Incidents />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/incidents/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Incidents />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/service-requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ServiceRequests />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/service-requests/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ServiceRequests />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </>
  );
};
