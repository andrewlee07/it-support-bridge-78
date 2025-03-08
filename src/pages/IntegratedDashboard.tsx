
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown, Download, Filter, RefreshCw } from 'lucide-react';
import { createApiSuccessResponse } from '@/utils/mockData/apiHelpers';
import { CrossSystemDashboardData } from '@/utils/types/dashboard';
import { RelationshipsDiagram } from '@/components/dashboard/cross-system/RelationshipsDiagram';
import { ReleaseSummaryCards } from '@/components/dashboard/cross-system/ReleaseSummaryCards';
import { BacklogProgressChart } from '@/components/dashboard/cross-system/BacklogProgressChart';
import { TestMetricsSection } from '@/components/dashboard/cross-system/TestMetricsSection';
import { ReportingControls } from '@/components/dashboard/cross-system/ReportingControls';

// Mock data for dashboard
const mockCrossSystemData: CrossSystemDashboardData = {
  releaseSummary: {
    totalReleases: 8,
    upcomingReleases: 3,
    releaseRiskScores: [
      { releaseId: 'rel-1', title: 'Release 1.0', version: '1.0.0', riskScore: 25, status: 'In Progress' },
      { releaseId: 'rel-2', title: 'Release 1.1', version: '1.1.0', riskScore: 65, status: 'Planned' },
      { releaseId: 'rel-3', title: 'Release 1.2', version: '1.2.0', riskScore: 15, status: 'Planned' },
    ],
    completionRate: 78
  },
  backlogProgress: [
    { releaseId: 'rel-1', title: 'Release 1.0', completed: 45, inProgress: 20, notStarted: 15 },
    { releaseId: 'rel-2', title: 'Release 1.1', completed: 10, inProgress: 35, notStarted: 45 },
    { releaseId: 'rel-3', title: 'Release 1.2', completed: 0, inProgress: 5, notStarted: 60 },
  ],
  testMetrics: {
    testCoverage: [
      { releaseId: 'rel-1', title: 'Release 1.0', coverage: 85 },
      { releaseId: 'rel-2', title: 'Release 1.1', coverage: 42 },
      { releaseId: 'rel-3', title: 'Release 1.2', coverage: 12 },
    ],
    bugsByRelease: [
      { releaseId: 'rel-1', title: 'Release 1.0', open: 8, fixed: 42 },
      { releaseId: 'rel-2', title: 'Release 1.1', open: 16, fixed: 4 },
      { releaseId: 'rel-3', title: 'Release 1.2', open: 3, fixed: 0 },
    ],
    testEffectiveness: 82,
    bugFixVelocity: 3.5,
  },
  relationships: {
    nodes: [
      { id: '1', label: 'Release 1.0', value: 10 },
      { id: '2', label: 'Backlog', value: 25 },
      { id: '3', label: 'Tests', value: 15 },
      { id: '4', label: 'Bugs', value: 8 },
      { id: '5', label: 'Release 1.1', value: 12 },
    ],
    links: [
      { source: '1', target: '2', value: 5 },
      { source: '1', target: '3', value: 8 },
      { source: '2', target: '3', value: 10 },
      { source: '3', target: '4', value: 7 },
      { source: '1', target: '4', value: 3 },
      { source: '2', target: '5', value: 8 },
    ]
  }
};

// Mock API function to fetch dashboard data
const fetchCrossSystemDashboard = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return createApiSuccessResponse(mockCrossSystemData);
};

const IntegratedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch dashboard data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['crossSystemDashboard'],
    queryFn: fetchCrossSystemDashboard
  });

  const dashboardData = data?.data || mockCrossSystemData;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrated Dashboard</h1>
          <p className="text-muted-foreground">Cross-system view of releases, backlog, and tests</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="mr-1 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-1 h-4 w-4" />
            Select Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-1 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-1 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="backlog">Backlog</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReleaseSummaryCards data={dashboardData.releaseSummary} />
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <BacklogProgressChart data={dashboardData.backlogProgress} />
            <TestMetricsSection data={dashboardData.testMetrics} />
          </div>
          
          <RelationshipsDiagram data={dashboardData.relationships} />
        </TabsContent>
        
        <TabsContent value="releases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Release Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed release metrics and health indicators</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backlog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backlog Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Backlog completion trends and item distribution</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Test effectiveness metrics and bug correlations</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <ReportingControls />
    </div>
  );
};

export default IntegratedDashboard;
