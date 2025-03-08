
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Incidents from './pages/Incidents';
import ServiceRequests from './pages/ServiceRequests';
import Changes from './pages/Changes';
import Releases from './pages/Releases';
import Assets from './pages/Assets';
import Backlog from './pages/Backlog';
import TestTracking from './pages/TestTracking';
import Users from './pages/Users';
import Reports from './pages/Reports';
import SLASettings from './pages/SLASettings';
import DropdownConfigurations from './pages/settings/DropdownConfigurations';
import RiskAssessmentSettings from './pages/settings/RiskAssessmentSettings';

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
              
              {/* Main application routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
              <Route path="/service-requests" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
              <Route path="/changes" element={<ProtectedRoute><Changes /></ProtectedRoute>} />
              <Route path="/releases" element={<ProtectedRoute><Releases /></ProtectedRoute>} />
              <Route path="/backlog" element={<ProtectedRoute><Backlog /></ProtectedRoute>} />
              <Route path="/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
              <Route path="/test-tracking" element={<ProtectedRoute><TestTracking /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              
              {/* Settings routes */}
              <Route path="/settings/sla" element={<ProtectedRoute><SLASettings /></ProtectedRoute>} />
              <Route path="/settings/dropdown-configurations" element={<ProtectedRoute><DropdownConfigurations /></ProtectedRoute>} />
              <Route path="/settings/risk-assessment" element={<ProtectedRoute><RiskAssessmentSettings /></ProtectedRoute>} />
              
              {/* Security routes */}
              <Route path="/security-audit-log" element={<ProtectedRoute><SecurityAuditLog /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              
              {/* Add a fallback redirect */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
