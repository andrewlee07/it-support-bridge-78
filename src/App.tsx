
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Sidebar from './components/shared/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Lazy load components
const ChangeDetail = lazy(() => import('./pages/ChangeDetail'));
const Changes = lazy(() => import('./pages/Changes'));
const NewChangeRequest = lazy(() => import('./pages/NewChangeRequest'));
const EditChangeRequest = lazy(() => import('./pages/EditChangeRequest'));
const CloseChangeRequest = lazy(() => import('./pages/CloseChangeRequest'));
const UserApprovals = lazy(() => import('./pages/UserApprovals'));
const Assets = lazy(() => import('./pages/Assets'));
const Incidents = lazy(() => import('./pages/Incidents'));
const ServiceRequests = lazy(() => import('./pages/ServiceRequests'));
const Releases = lazy(() => import('./pages/Releases'));
const Backlog = lazy(() => import('./pages/Backlog'));
const BacklogKanban = lazy(() => import('./pages/BacklogKanban'));
const ServiceCatalog = lazy(() => import('./pages/ServiceCatalog'));
const Bugs = lazy(() => import('./pages/Bugs'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex w-full">
            <Sidebar />
            <div className="flex-1">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/incidents" element={<Incidents />} />
                  <Route path="/service-requests" element={<ServiceRequests />} />
                  <Route path="/assets" element={<Assets />} />
                  <Route path="/releases" element={<Releases />} />
                  <Route path="/backlog" element={<Backlog />} />
                  <Route path="/backlog/kanban" element={<BacklogKanban />} />
                  <Route path="/service-catalog" element={<ServiceCatalog />} />
                  <Route path="/bugs" element={<Bugs />} />
                  
                  {/* Change Management Routes */}
                  <Route path="/changes" element={<Changes />} />
                  <Route path="/changes/:id" element={<ChangeDetail />} />
                  <Route path="/changes/new" element={<NewChangeRequest />} />
                  <Route path="/changes/:id/edit" element={<EditChangeRequest />} />
                  <Route path="/changes/:id/close" element={<CloseChangeRequest />} />
                  <Route path="/approvals" element={<UserApprovals />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
