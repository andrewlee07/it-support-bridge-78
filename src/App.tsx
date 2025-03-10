
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // React Query v5 doesn't support suspense in the defaultOptions
      // Remove the suspense option
      staleTime: 5 * 60 * 1000, // 5 minutes
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
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />

              {/* Protected Routes - Requires Authentication */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Change Management Routes */}
              <Route path="/changes" element={<Changes />} />
              <Route path="/changes/:id" element={<ChangeDetail />} />
              <Route path="/changes/new" element={<NewChangeRequest />} />
              <Route path="/changes/:id/edit" element={<EditChangeRequest />} />
              <Route path="/changes/:id/close" element={<CloseChangeRequest />} />
              <Route path="/approvals" element={<UserApprovals />} />
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
