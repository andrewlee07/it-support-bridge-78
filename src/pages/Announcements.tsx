
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';

const Announcements: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view system announcements
          </p>
        </div>
        <div className="glass-panel p-6 rounded-lg">
          <p>Announcements content will be implemented here.</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Announcements;
