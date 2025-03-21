
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Play, 
  History, 
  Link,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TestCaseTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  executionCount?: number;
  issuesCount?: number;
}

const TestCaseTabs = ({ 
  activeTab, 
  setActiveTab,
  executionCount = 0,
  issuesCount = 0
}: TestCaseTabsProps) => {
  return (
    <TabsList className="mb-6 w-full flex flex-wrap justify-start">
      <TabsTrigger 
        value="details" 
        className="flex items-center"
        onClick={() => setActiveTab('details')}
        data-state={activeTab === 'details' ? 'active' : ''}
      >
        <Database className="w-4 h-4 mr-1" />
        Details
      </TabsTrigger>
      
      <TabsTrigger 
        value="executions" 
        className="flex items-center gap-1"
        onClick={() => setActiveTab('executions')}
        data-state={activeTab === 'executions' ? 'active' : ''}
      >
        <Play className="h-4 w-4" />
        Executions
        {executionCount > 0 && (
          <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
            {executionCount}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="history" 
        className="flex items-center"
        onClick={() => setActiveTab('history')}
        data-state={activeTab === 'history' ? 'active' : ''}
      >
        <History className="h-4 w-4 mr-1" />
        History
      </TabsTrigger>
      
      <TabsTrigger 
        value="issues" 
        className="flex items-center gap-1"
        onClick={() => setActiveTab('issues')}
        data-state={activeTab === 'issues' ? 'active' : ''}
      >
        <RefreshCw className="h-4 w-4" />
        Issues
        {issuesCount > 0 && (
          <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
            {issuesCount}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="traceability" 
        className="flex items-center"
        onClick={() => setActiveTab('traceability')}
        data-state={activeTab === 'traceability' ? 'active' : ''}
      >
        <Link className="h-4 w-4 mr-1" />
        Traceability
      </TabsTrigger>
    </TabsList>
  );
};

export default TestCaseTabs;
