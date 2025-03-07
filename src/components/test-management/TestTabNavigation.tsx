
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  ClipboardList,
  Bug,
  PlayCircle
} from 'lucide-react';

interface TestTabNavigationProps {
  activeTab: string;
}

const TestTabNavigation = ({ activeTab }: TestTabNavigationProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <TabsTrigger value="dashboard" className="flex items-center gap-2">
        <Activity className="h-4 w-4" />
        <span className="hidden md:inline">Dashboard</span>
      </TabsTrigger>
      <TabsTrigger value="testcases" className="flex items-center gap-2">
        <ClipboardList className="h-4 w-4" />
        <span className="hidden md:inline">Test Cases</span>
      </TabsTrigger>
      <TabsTrigger value="bugs" className="flex items-center gap-2">
        <Bug className="h-4 w-4" />
        <span className="hidden md:inline">Bugs</span>
      </TabsTrigger>
      <TabsTrigger value="execution" className="flex items-center gap-2">
        <PlayCircle className="h-4 w-4" />
        <span className="hidden md:inline">Test Execution</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TestTabNavigation;
