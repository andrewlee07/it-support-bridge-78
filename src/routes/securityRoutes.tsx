
import { RouteObject } from 'react-router-dom';
import SecurityManagement from '@/pages/SecurityManagement';
import SecurityCaseDetailPage from '@/pages/SecurityCaseDetailPage';

/**
 * Security management routes
 * 
 * These routes should be included in your main router configuration.
 * If you're using React Router v6 with the new Data API, add these routes
 * to your main router configuration.
 * 
 * Example usage in your root route configuration:
 * 
 * import { securityRoutes } from './routes/securityRoutes';
 * 
 * const router = createBrowserRouter([
 *   {
 *     path: "/",
 *     element: <RootLayout />,
 *     children: [
 *       // Other routes
 *       ...securityRoutes,
 *     ],
 *   },
 * ]);
 */
export const securityRoutes: RouteObject[] = [
  {
    path: 'security',
    element: <SecurityManagement />
  },
  {
    // This path should be exactly what's in the URL - 'security/case/:id' to match 'security/case/SEC00001'
    path: 'security/case/:id',
    element: <SecurityCaseDetailPage />
  }
];
