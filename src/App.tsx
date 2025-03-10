import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './hooks/use-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import NewTicket from './pages/NewTicket';
import EditTicket from './pages/EditTicket';
import Admin from './pages/Admin';
import Loading from './components/shared/Loading';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/RequireAdmin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

// Lazy load the ChangeDetail and Changes components
const ChangeDetail = lazy(() => import('./pages/ChangeDetail'));
const Changes = lazy(() => import('./pages/Changes'));
const NewChangeRequest = lazy(() => import('./pages/NewChangeRequest'));
const EditChangeRequest = lazy(() => import('./pages/EditChangeRequest'));
const CloseChangeRequest = lazy(() => import('./pages/CloseChangeRequest'));
const UserApprovals = lazy(() => import('./pages/UserApprovals'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />

                {/* Protected Routes - Requires Authentication */}
                <Route element={<RequireAuth />}>
                  <Route path="/" element={<Layout><Dashboard /></Layout>} />
                  <Route path="/profile" element={<Layout><Profile /></Layout>} />

                  {/* Ticket Routes */}
                  <Route path="/tickets" element={<Layout><Tickets /></Layout>} />
                  <Route path="/tickets/:id" element={<Layout><TicketDetail /></Layout>} />
                  <Route path="/tickets/new" element={<Layout><NewTicket /></Layout>} />
                  <Route path="/tickets/:id/edit" element={<Layout><EditTicket /></Layout>} />

                  {/* Change Management Routes */}
                  <Route path="/changes" element={<Layout><Changes /></Layout>} />
                  <Route path="/changes/:id" element={<Layout><ChangeDetail /></Layout>} />
                  <Route path="/changes/new" element={<Layout><NewChangeRequest /></Layout>} />
                  <Route path="/changes/:id/edit" element={<Layout><EditChangeRequest /></Layout>} />
                  <Route path="/changes/:id/close" element={<Layout><CloseChangeRequest /></Layout>} />
                  <Route path="/approvals" element={<Layout><UserApprovals /></Layout>} />

                  {/* Admin Routes - Requires Admin Role */}
                  <Route element={<RequireAdmin />}>
                    <Route path="/admin" element={<Layout><Admin /></Layout>} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </ToastProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
