
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TicketPriority } from '@/utils/types/ticket';
import { getDashboardStats } from '@/utils/mockData/dashboardStats';
import { ServiceDashboardCard } from '@/components/services/ServiceDashboardCard';

// Helper function to determine if a ticket is high priority
export const isHighPriority = (priority: TicketPriority): boolean => {
  return priority === 'P1' || priority === 'P2';
};

// Dashboard component
const Dashboard = () => {
  // Get dashboard statistics
  const dashboardStats = getDashboardStats();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to the IT Support Bridge
          </p>
        </div>

        <Tabs defaultValue="overview" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.openIncidents}</div>
                </CardContent>
              </Card>
              <ServiceDashboardCard />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.pendingChangeRequests}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.slaCompliance}%</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest tickets and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardStats.recentTickets.length > 0 ? (
                    <ul className="space-y-2">
                      {dashboardStats.recentTickets.map(ticket => (
                        <li key={ticket.id} className="text-sm">
                          <span className="font-medium">{ticket.title}</span>
                          <span className="text-muted-foreground"> - {ticket.status}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      No recent activity to display.
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 font-medium">All systems operational</p>
                  <p className="text-muted-foreground mt-2">
                    Last updated: {new Date().toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Tickets</CardTitle>
                <CardDescription>Tickets assigned to you</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No tickets are currently assigned to you.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Performance and metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <p className="text-muted-foreground">
                  Reports will be available soon.
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
