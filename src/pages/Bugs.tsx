
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useToast } from '@/hooks/use-toast';
import BugsTab from '@/components/test-management/BugsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Bugs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <PageTransition>
      <div className="space-y-6 container mx-auto py-6">
        <BugsTab />

        {/* Additional tabs could be added below if needed */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="hidden">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Bugs</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Bugs;
