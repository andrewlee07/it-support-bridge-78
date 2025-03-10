
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ErrorPage from '@/pages/ErrorPage';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import Problems from '@/pages/Problems';
import Changes from '@/pages/Changes';
import ChangeDetail from '@/pages/ChangeDetail';
import NewChangeRequest from '@/pages/NewChangeRequest';
import EditChangeRequest from '@/pages/EditChangeRequest';
import RejectChange from '@/pages/RejectChange';
import CloseChange from '@/pages/CloseChange';
import Calendar from '@/pages/Calendar';
import Approvals from '@/pages/Approvals';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/incidents',
        element: <Incidents />,
      },
      {
        path: '/service-requests',
        element: <ServiceRequests />,
      },
      {
        path: '/problems',
        element: <Problems />,
      },
      {
        path: '/changes',
        element: <Changes />,
      },
      {
        path: '/changes/:id',
        element: <ChangeDetail />,
      },
      {
        path: '/changes/new',
        element: <NewChangeRequest />,
      },
      {
        path: '/changes/:id/edit',
        element: <EditChangeRequest />,
      },
      {
        path: '/changes/:id/reject',
        element: <RejectChange />,
      },
      {
        path: '/changes/:id/close',
        element: <CloseChange />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/approvals',
        element: <Approvals />,
      },
    ],
  },
]);

export default router;
