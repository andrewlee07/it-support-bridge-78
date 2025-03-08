
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { TestCase } from '@/utils/types/test/testCase';
import { Info, TestTube } from 'lucide-react';
import TestCoverageTab from './TestCoverageTab';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import TestCaseDetails from '@/components/test-management/TestCaseDetails';

interface BacklogItemDetailTabsProps {
  backlogItem: BacklogItem;
  children?: React.ReactNode; // For the Info tab content
}

const BacklogItemDetailTabs: React.FC<BacklogItemDetailTabsProps> = ({ 
  backlogItem, 
  children 
}) => {
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [isTestCaseDialogOpen, setIsTestCaseDialogOpen] = useState(false);

  const handleViewTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsTestCaseDialogOpen(true);
  };

  return (
    <Tabs defaultValue="info" className="w-full mt-6">
      <TabsList>
        <TabsTrigger value="info" className="flex items-center">
          <Info className="h-4 w-4 mr-2" />
          Details
        </TabsTrigger>
        <TabsTrigger value="tests" className="flex items-center">
          <TestTube className="h-4 w-4 mr-2" />
          Test Coverage
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="info">
        {children}
      </TabsContent>
      
      <TabsContent value="tests">
        <TestCoverageTab 
          backlogItemId={backlogItem.id}
          onViewTestCase={handleViewTestCase}
        />
      </TabsContent>

      {/* Test Case Details Dialog */}
      <Dialog open={isTestCaseDialogOpen} onOpenChange={setIsTestCaseDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedTestCase && (
            <TestCaseDetails testCase={selectedTestCase} />
          )}
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};

export default BacklogItemDetailTabs;
