
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout, FileSpreadsheet, Bug, Play } from 'lucide-react';

interface TestTabNavigationProps {
  activeTab: string;
}

const TestTabNavigation: React.FC<TestTabNavigationProps> = ({ activeTab }) => {
  return (
    <TabsList className="mb-6 grid grid-cols-4 w-full md:w-auto">
      <TabsTrigger value="dashboard" className="flex items-center gap-2">
        <Layout className="h-4 w-4" />
        <span>Dashboard</span>
      </TabsTrigger>
      <TabsTrigger value="testcases" className="flex items-center gap-2">
        <FileSpreadsheet className="h-4 w-4" />
        <span>Test Cases</span>
      </TabsTrigger>
      <TabsTrigger value="bugs" className="flex items-center gap-2">
        <Bug className="h-4 w-4" />
        <span>Bugs</span>
      </TabsTrigger>
      <TabsTrigger value="execution" className="flex items-center gap-2">
        <Play className="h-4 w-4" />
        <span>Execution</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TestTabNavigation;
