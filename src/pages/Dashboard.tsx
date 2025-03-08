
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TicketPriority } from '@/utils/types/ticket';
import { getAggregatedTestCoverage, getTraceabilityMatrix } from '@/utils/api/testBacklogIntegrationApi';

// Replace the isHighPriority function to use P1 and P2 as high priority
export const isHighPriority = (priority: TicketPriority): boolean => {
  return priority === 'P1' || priority === 'P2';
};

// Sample data for dashboard
const releaseHealthData = [
  { name: 'Release 1.0', coverage: 85, bugs: 5, tests: 120 },
  { name: 'Release 1.1', coverage: 76, bugs: 12, tests: 95 },
  { name: 'Release 1.2', coverage: 90, bugs: 3, tests: 140 },
  { name: 'Release 1.3', coverage: 65, bugs: 18, tests: 80 },
];

const backlogPriorityData = [
  { name: 'Critical', value: 8, color: '#ef4444' },
  { name: 'High', value: 15, color: '#f97316' },
  { name: 'Medium', value: 25, color: '#facc15' },
  { name: 'Low', value: 18, color: '#22c55e' },
];

// Dashboard component
export const Dashboard = () => {
  // Get aggregated test coverage data
  const { data: coverageData, isLoading: isLoadingCoverage } = useQuery({
    queryKey: ['aggregatedTestCoverage'],
    queryFn: getAggregatedTestCoverage,
  });
  
  // Get traceability matrix
  const { data: traceabilityData, isLoading: isLoadingTraceability } = useQuery({
    queryKey: ['traceabilityMatrix'],
    queryFn: getTraceabilityMatrix,
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Unified view across all systems
          </p>
        </div>

        <Tabs defaultValue="overview" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="release">Release Health</TabsTrigger>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Releases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Test Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingCoverage ? "Loading..." : `${coverageData?.data?.overallCoverage || 0}%`}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Open Bugs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">17</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Backlog Items by Priority</CardTitle>
                  <CardDescription>Distribution of work items by priority</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={backlogPriorityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {backlogPriorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Release Health Trends</CardTitle>
                  <CardDescription>Quality metrics across recent releases</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={releaseHealthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="coverage" name="Coverage %" fill="#3b82f6" />
                      <Bar dataKey="bugs" name="Bugs" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="release" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Release Health Dashboard</CardTitle>
                <CardDescription>Integrated metrics across releases</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <p className="text-muted-foreground mb-4">
                  Detailed release health metrics will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Test and bug data correlation</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <p className="text-muted-foreground mb-4">
                  Quality metrics dashboard will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Cross-system performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <p className="text-muted-foreground mb-4">
                  Team performance dashboard will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
