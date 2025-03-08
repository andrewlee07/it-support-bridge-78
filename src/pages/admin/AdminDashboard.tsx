
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';

const AdminDashboard: React.FC = () => {
  return (
    <PageTransition>
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System administration and configuration dashboard
        </p>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
