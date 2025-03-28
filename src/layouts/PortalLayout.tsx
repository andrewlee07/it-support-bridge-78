
import React from 'react';
import { Outlet } from 'react-router-dom';
import PortalHeader from '@/components/portal/PortalHeader';

const PortalLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <PortalHeader />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PortalLayout;
