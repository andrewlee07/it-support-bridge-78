
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecurityCase, SecurityCaseTab } from '@/utils/types/security';

import SecurityCaseInfoCard from './SecurityCaseInfoCard';
import ActivityTimeline from './ActivityTimeline';
import SecurityCaseNotes from './SecurityCaseNotes';
import AffectedServicesCard from './AffectedServicesCard';
import RelatedItemsCard from './RelatedItemsCard';
import SLAInformation from './SLAInformation';
import AssignmentCard from './AssignmentCard';
import RelatedKnowledgeCard from './RelatedKnowledgeCard';
import SimilarCasesCard from './SimilarCasesCard';

interface SecurityCaseTabsProps {
  securityCase: SecurityCase;
  activeTab: SecurityCaseTab;
  setActiveTab: (tab: SecurityCaseTab) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getTypeColor: (type: string) => string;
  formatDate: (dateString: string) => string;
  handleSystemClick: (system: string) => void;
  responseSLA: any;
  resolutionSLA: any;
  getSLAIndicatorColor: (progress: number) => string;
  openAddNoteDialog: () => void;
}

const SecurityCaseTabs: React.FC<SecurityCaseTabsProps> = ({
  securityCase,
  activeTab,
  setActiveTab,
  getStatusColor,
  getPriorityColor,
  getTypeColor,
  formatDate,
  handleSystemClick,
  responseSLA,
  resolutionSLA,
  getSLAIndicatorColor,
  openAddNoteDialog
}) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SecurityCaseTab)}>
      <TabsList className="mb-6 border-b w-full justify-start rounded-none h-auto p-0">
        <TabsTrigger 
          value="overview" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="notes" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
        >
          Notes
        </TabsTrigger>
        <TabsTrigger 
          value="affected-systems" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
        >
          Affected Services
        </TabsTrigger>
        <TabsTrigger 
          value="related-items" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
        >
          Related Items
        </TabsTrigger>
      </TabsList>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content column - approximately 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab content panels */}
          <TabsContent value="overview" className="mt-0 space-y-6">
            <SecurityCaseInfoCard 
              securityCase={securityCase}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
              getTypeColor={getTypeColor}
              formatDate={formatDate}
              handleSystemClick={handleSystemClick}
            />
            
            <ActivityTimeline 
              securityCase={securityCase}
              formatDate={formatDate}
            />
          </TabsContent>

          <TabsContent value="notes" className="mt-0 space-y-6">
            <SecurityCaseNotes 
              securityCase={securityCase}
              formatDate={formatDate}
              openAddNoteDialog={openAddNoteDialog}
            />
          </TabsContent>

          <TabsContent value="affected-systems" className="mt-0 space-y-6">
            <AffectedServicesCard 
              securityCase={securityCase}
              handleSystemClick={handleSystemClick}
            />
          </TabsContent>

          <TabsContent value="related-items" className="mt-0 space-y-6">
            <RelatedItemsCard 
              securityCase={securityCase}
            />
          </TabsContent>
        </div>

        {/* Side panel column - approximately 1/3 width */}
        <div className="space-y-6">
          {/* SLA Status Card */}
          <SLAInformation 
            responseSLA={responseSLA}
            resolutionSLA={resolutionSLA}
            getSLAIndicatorColor={getSLAIndicatorColor}
          />

          {/* Assignee Card */}
          <AssignmentCard 
            securityCase={securityCase}
          />

          {/* Related Knowledge */}
          <RelatedKnowledgeCard />

          {/* Similar Security Cases */}
          <SimilarCasesCard />
        </div>
      </div>
    </Tabs>
  );
};

export default SecurityCaseTabs;
