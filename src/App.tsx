import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import Layout from '@/components/shared/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ConfirmDialogProvider from '@/contexts/ConfirmDialogContext';
import { EventBusProvider } from '@/contexts/EventBusContext';

// Import pages
import Dashboard from '@/pages/Dashboard';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import SecurityCases from '@/pages/SecurityCases';
import Problems from '@/pages/Problems';
import Changes from '@/pages/Changes';
import Backlog from '@/pages/Backlog';
import Releases from '@/pages/Releases';
import Tasks from '@/pages/Tasks';
import Assets from '@/pages/Assets';
import TestTracking from '@/pages/TestTracking';
import KnowledgeBase from '@/pages/KnowledgeBase';
import Calendar from '@/pages/Calendar';
import Announcements from '@/pages/Announcements';
import Reports from '@/pages/Reports';
import Users from '@/pages/Users';
import Admin from '@/pages/Admin';
import EndUserPortal from '@/pages/EndUserPortal';
import TicketDetail from '@/components/tickets/TicketDetail';

import Error404 from '@/pages/Error404';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ConfirmDialogProvider>
        <EventBusProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
              <Route path="incidents/:id" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
              <Route path="service-requests" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
              <Route path="service-requests/:id" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
              <Route path="security-cases" element={<ProtectedRoute><SecurityCases /></ProtectedRoute>} />
              <Route path="security-cases/:id" element={<ProtectedRoute><SecurityCases /></ProtectedRoute>} />
              <Route path="problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
              <Route path="changes" element={<ProtectedRoute><Changes /></ProtectedRoute>} />
              <Route path="backlog" element={<ProtectedRoute><Backlog /></ProtectedRoute>} />
              <Route path="releases" element={<ProtectedRoute><Releases /></ProtectedRoute>} />
              <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
              <Route path="test-tracking" element={<ProtectedRoute><TestTracking /></ProtectedRoute>} />
              <Route path="knowledge" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />
              <Route path="calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
              <Route path="reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="portal" element={<ProtectedRoute><EndUserPortal /></ProtectedRoute>} />
              <Route path="*" element={<Error404 />} />
            </Route>
          </Routes>
        </EventBusProvider>
      </ConfirmDialogProvider>
    </AuthProvider>
  );
};

export default App;
