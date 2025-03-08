
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import Changes from '@/pages/Changes';
import Releases from '@/pages/Releases';
import Assets from '@/pages/Assets';
import TestTracking from '@/pages/TestTracking';
import TestExecution from '@/pages/TestExecution';
import Bugs from '@/pages/Bugs';
import Users from '@/pages/Users';
import Reports from '@/pages/Reports';
import ProblemManagement from '@/pages/ProblemManagement';
import Calendar from '@/pages/Calendar';
import Backlog from '@/pages/Backlog';
import AdminSettings from '@/pages/AdminSettings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
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
      
      {/* Service Request routes */}
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
      
      {/* Change Management routes */}
      <Route 
        path="/changes" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Changes />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/changes/:id" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Changes />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Release Management routes */}
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
      
      {/* Asset Management routes */}
      <Route 
        path="/assets" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/assets/:id" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Assets />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
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
      
      {/* User Management route */}
      <Route 
        path="/users" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <Users />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Reporting route */}
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Problem Management route */}
      <Route 
        path="/problem-management" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProblemManagement />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Calendar route */}
      <Route 
        path="/calendar" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Calendar />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Backlog route */}
      <Route 
        path="/backlog" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <Backlog />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Admin routes - Make sure all are locked down to admin role */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <AdminSettings />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <AdminSettings />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings/*" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <MainLayout>
              <AdminSettings />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
