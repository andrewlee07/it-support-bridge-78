
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { getReleases } from '@/utils/api/releaseApi';
import ReleaseSummaryCards from '@/components/dashboard/cross-system/ReleaseSummaryCards';
import BacklogProgressChart from '@/components/dashboard/cross-system/BacklogProgressChart';
import TestMetricsSection from '@/components/dashboard/cross-system/TestMetricsSection';
import RelationshipsDiagram from '@/components/dashboard/cross-system/RelationshipsDiagram';
import { fetchDashboardData } from '@/utils/api/dashboardApi';
import { Button } from '@/components/ui/button';
import ReportingControls from '@/components/dashboard/cross-system/ReportingControls';

const IntegratedDashboard = () => {
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch all releases for the filter dropdown
  const { data: releasesResponse, isLoading: isLoadingReleases } = useQuery({
    queryKey: ['releases'],
    queryFn: getReleases,
  });

  // Fetch dashboard data based on selected filters
  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
    queryKey: ['dashboardData', selectedReleaseId, timeRange],
    queryFn: () => fetchDashboardData(selectedReleaseId, timeRange),
  });

  const releases = releasesResponse?.data || [];
  const isLoading = isLoadingReleases || isLoadingDashboard;

  return (
    <PageTransition>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cross-System Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Unified view across releases, backlog items, and test management
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Select value={selectedReleaseId} onValueChange={setSelectedReleaseId}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Release" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Releases</SelectItem>
                {isLoadingReleases ? (
                  <SelectItem value="loading" disabled>
                    Loading releases...
                  </SelectItem>
                ) : (
                  releases.map(release => (
                    <SelectItem key={release.id} value={release.id}>
                      {release.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="releases">Releases</TabsTrigger>
            <TabsTrigger value="backlog">Backlog</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {isLoading ? (
              <div className="h-[500px] flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading dashboard data...</div>
              </div>
            ) : !dashboardData ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No data available for the selected filters</p>
              </div>
            ) : (
              <>
                <ReleaseSummaryCards data={dashboardData.releaseSummary} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <BacklogProgressChart data={dashboardData.backlogProgress} />
                  <TestMetricsSection data={dashboardData.testMetrics} />
                </div>
                <RelationshipsDiagram data={dashboardData.relationships} />
                <ReportingControls />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="releases" className="space-y-6">
            {/* Releases-specific content will be implemented here */}
            <div className="text-center py-12">
              <p className="text-muted-foreground">Detailed release metrics will be available soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="backlog" className="space-y-6">
            {/* Backlog-specific content will be implemented here */}
            <div className="text-center py-12">
              <p className="text-muted-foreground">Detailed backlog metrics will be available soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="space-y-6">
            {/* Testing-specific content will be implemented here */}
            <div className="text-center py-12">
              <p className="text-muted-foreground">Detailed testing metrics will be available soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default IntegratedDashboard;
