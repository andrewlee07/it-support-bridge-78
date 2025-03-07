
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PageTransition from '@/components/shared/PageTransition';
import TestTrackingHeader from '@/components/test-management/TestTrackingHeader';
import TestTabNavigation from '@/components/test-management/TestTabNavigation';
import TestDashboard from '@/components/test-management/dashboard/TestDashboard';
import TestCasesTab from '@/components/test-management/TestCasesTab';
import BugsTab from '@/components/test-management/BugsTab';
import TestExecutionTab from '@/components/test-management/TestExecutionTab';

const TestTracking = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        {/* Header section */}
        <TestTrackingHeader />

        {/* Main content */}
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TestTabNavigation activeTab={activeTab} />

          <TabsContent value="dashboard" className="space-y-4">
            <TestDashboard />
          </TabsContent>

          <TabsContent value="testcases">
            <TestCasesTab />
          </TabsContent>

          <TabsContent value="bugs">
            <BugsTab />
          </TabsContent>

          <TabsContent value="execution">
            <TestExecutionTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default TestTracking;
