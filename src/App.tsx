
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MFAVerification from './pages/MFAVerification';
import SecurityQuestionRecovery from './pages/SecurityQuestionRecovery';
import SecurityAuditLog from './pages/SecurityAuditLog';
import AdminSettings from './pages/AdminSettings';
import SessionTimeoutAlert from './components/auth/SessionTimeoutAlert';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Router>
          <AuthProvider>
            <SessionTimeoutAlert />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mfa-verification" element={<MFAVerification />} />
              <Route path="/security-recovery" element={<SecurityQuestionRecovery />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/security-audit-log" 
                element={
                  <ProtectedRoute>
                    <SecurityAuditLog />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedRoute>
                    <AdminSettings />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
