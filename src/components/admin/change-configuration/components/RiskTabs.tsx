
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RiskTabsProps {
  children: React.ReactNode;
  defaultTab?: string;
}

const RiskTabs: React.FC<RiskTabsProps> = ({ 
  children, 
  defaultTab = "questions" 
}) => {
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="questions">Risk Questions</TabsTrigger>
        <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default RiskTabs;
