
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import RiskQuestionsTab from '../RiskQuestionsTab';

const RiskQuestionsContent: React.FC = () => {
  return (
    <TabsContent value="questions" className="space-y-4">
      <RiskQuestionsTab />
    </TabsContent>
  );
};

export default RiskQuestionsContent;
