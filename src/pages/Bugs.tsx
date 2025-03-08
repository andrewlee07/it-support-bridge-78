
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useToast } from '@/hooks/use-toast';
import BugsTab from '@/components/test-management/BugsTab';

const Bugs = () => {
  const { toast } = useToast();

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bugs</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage bugs
            </p>
          </div>

          <BugsTab />
        </div>
      </div>
    </PageTransition>
  );
};

export default Bugs;
