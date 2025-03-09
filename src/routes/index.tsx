
import { createBrowserRouter } from 'react-router-dom';
import adminRoutes from './adminRoutes';
import assetRoutes from './assetRoutes';
import changeRoutes from './changeRoutes';
import dashboardRoutes from './dashboardRoutes';
import ticketRoutes from './ticketRoutes';
import testManagementRoutes from './testManagementRoutes';
import otherRoutes from './otherRoutes';

// If we need to lazy load any of these routes later, we can use the following pattern:
// const SomePage = lazy(() => import('@/pages/SomePage'));

// Import the ServiceDetail page
import ServiceDetail from '@/pages/ServiceDetail';
// Import the missing Releases and Index pages
import Releases from '@/pages/Releases';
import Index from '@/pages/Index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
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
  {
    path: '/releases',
    element: <Releases />,
  },
]);

export default router;
