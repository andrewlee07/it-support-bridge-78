
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import BugsTab from '@/components/test-management/BugsTab';

const Bugs = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <BugsTab />
      </div>
    </PageTransition>
  );
};

export default Bugs;
