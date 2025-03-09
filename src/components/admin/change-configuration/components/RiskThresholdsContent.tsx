
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import RiskThresholdsTab from '../RiskThresholdsTab';

const RiskThresholdsContent: React.FC = () => {
  return (
    <TabsContent value="thresholds" className="space-y-4">
      <RiskThresholdsTab />
    </TabsContent>
  );
};

export default RiskThresholdsContent;
