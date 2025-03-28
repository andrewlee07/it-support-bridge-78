
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ServiceCatalog from './pages/ServiceCatalog';
import ServiceManagementPage from './pages/ServiceManagementPage';
import ServiceCatalogManagementPage from './pages/ServiceCatalogManagementPage';
import NotFound from './pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/service-catalog" element={<ServiceCatalog />} />
      <Route path="/service-management" element={<ServiceManagementPage />} />
      <Route path="/service-catalog-management" element={<ServiceCatalogManagementPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
