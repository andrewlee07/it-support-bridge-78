
import React from 'react';
import { RouteObject } from 'react-router-dom';
import TestCoverageAndTraceability from '@/pages/TestCoverageAndTraceability';

const testCoverageRoutes: RouteObject[] = [
  {
    path: 'test-coverage',
    element: <TestCoverageAndTraceability />,
  },
];

export default testCoverageRoutes;
