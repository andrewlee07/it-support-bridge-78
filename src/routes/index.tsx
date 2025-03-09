
import { createBrowserRouter } from 'react-router-dom';
import adminRoutes from './adminRoutes';
import assetRoutes from './assetRoutes';
import changeRoutes from './changeRoutes';
import dashboardRoutes from './dashboardRoutes';
import ticketRoutes from './ticketRoutes';
import testManagementRoutes from './testManagementRoutes';
import { otherRoutes } from './otherRoutes';

// If we need to lazy load any of these routes later, we can use the following pattern:
// const SomePage = lazy(() => import('@/pages/SomePage'));

// Import the ServiceDetail page
import ServiceDetail from '@/pages/ServiceDetail';

const router = createBrowserRouter([
  ...adminRoutes,
  ...assetRoutes,
  ...changeRoutes,
  ...dashboardRoutes,
  ...ticketRoutes,
  ...testManagementRoutes,
  ...otherRoutes,
  {
    path: '/service-catalog/:serviceId',
    element: <ServiceDetail />,
  },
]);

export default router;
