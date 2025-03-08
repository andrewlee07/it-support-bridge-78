import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import Changes from '@/pages/Changes';
import Releases from '@/pages/Releases';
import Assets from '@/pages/Assets';
import Users from '@/pages/Users';
import Reports from '@/pages/Reports';
import AdminSettings from '@/pages/AdminSettings';
import SLASettings from '@/pages/SLASettings';
import DropdownConfigurations from '@/pages/DropdownConfigurations';
import RiskAssessment from '@/pages/RiskAssessment';
import TestTracking from '@/pages/TestTracking';
import TestExecution from '@/pages/TestExecution';
import Bugs from '@/pages/Bugs';
import ProblemManagement from '@/pages/ProblemManagement';
import Calendar from '@/pages/Calendar';
import Backlog from '@/pages/Backlog';
import MainLayout from '@/components/shared/MainLayout';
import { mockUsers } from '@/utils/mockData/users';
import { updateUser } from '@/utils/mockData/users';
import { User } from '@/utils/types/user';
import ErrorLogs from './pages/admin/ErrorLogs';

// ProtectedRoute component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRoles?: string[];
}> = ({ children, requiredRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Persist current location to localStorage for post-login redirect
    if (!loading && !user) {
      localStorage.setItem('redirectAfterLogin', location.pathname);
    }
  }, [user, loading, location]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <div>Unauthorized</div>; // Or redirect to an unauthorized page
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
            path="/users"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <MainLayout>
                  <Users />
                </MainLayout>
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/settings/sla"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <MainLayout>
                  <SLASettings />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/dropdown-configurations"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <MainLayout>
                  <DropdownConfigurations />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/risk-assessment"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <MainLayout>
                  <RiskAssessment />
                </MainLayout>
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <MainLayout>
                  <AdminSettings />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/admin/error-logs" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <MainLayout>
                <ErrorLogs />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
