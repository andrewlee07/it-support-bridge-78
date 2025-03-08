
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RiskQuestionsTab from './RiskQuestionsTab';
import RiskThresholdsTab from './RiskThresholdsTab';

const RiskAssessmentTabs = () => {
  return (
    <Tabs defaultValue="questions">
      <TabsList className="mb-4">
        <TabsTrigger value="questions">Risk Questions</TabsTrigger>
        <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
      </TabsList>
      
      <TabsContent value="questions" className="space-y-4">
        <RiskQuestionsTab />
      </TabsContent>
      
      <TabsContent value="thresholds" className="space-y-4">
        <RiskThresholdsTab />
      </TabsContent>
    </Tabs>
  );
};

export default RiskAssessmentTabs;
