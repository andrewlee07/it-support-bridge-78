
# Security Routes Integration Guide

To correctly integrate the security case detail view, follow these steps:

1. Make sure your router configuration includes these routes:

```tsx
{
  path: "/security",
  element: <SecurityManagement />
},
{
  path: "/security/case/:id",
  element: <SecurityCaseDetailPage />
}
```

2. You can import these routes from the securityRoutes.tsx file:

```tsx
import { securityRoutes } from './routes/securityRoutes';

// Then spread them into your router configuration
const routes = [
  // Your existing routes
  ...securityRoutes
];
```

3. Check that you're using the correct navigation functions from navigationUtils.ts:
   - Use `goToSecurityCaseDetail(id)` to navigate to the detail view
   - Ensure that all table row click handlers and view buttons use this function

4. Security cases can now be viewed by:
   - Clicking on any case in the table
   - Clicking the view button in the actions column
   - Navigating directly to `/security/case/[id]`
