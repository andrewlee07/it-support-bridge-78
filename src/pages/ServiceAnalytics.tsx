
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import ServiceTicketsReport from '@/components/services/ServiceTicketsReport';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockServiceTicketCounts } from '@/utils/mockData/services';

const ServiceAnalytics = () => {
  const totalIncidents = mockServiceTicketCounts.reduce((acc, item) => acc + item.incidents, 0);
  const totalRequests = mockServiceTicketCounts.reduce((acc, item) => acc + item.requests, 0);
  const totalTickets = totalIncidents + totalRequests;
  
  // Find service with most tickets
  const serviceWithMostTickets = mockServiceTicketCounts.reduce(
    (prev, current) => (prev.total > current.total) ? prev : current
  );
  
  // Find service with most incidents
  const serviceWithMostIncidents = mockServiceTicketCounts.reduce(
    (prev, current) => (prev.incidents > current.incidents) ? prev : current
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Monitor service health and usage metrics
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTickets}</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalIncidents}</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests}</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Active Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{serviceWithMostTickets.serviceName}</div>
              <p className="text-xs text-muted-foreground">
                {serviceWithMostTickets.total} tickets
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <ServiceTicketsReport />
          
          <Card>
            <CardHeader>
              <CardTitle>Service Health</CardTitle>
              <CardDescription>
                Services with highest incident rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockServiceTicketCounts
                  .sort((a, b) => b.incidents - a.incidents)
                  .slice(0, 5)
                  .map((service, index) => (
                    <div key={service.serviceId} className="flex items-center">
                      <div className="w-8 text-center">{index + 1}</div>
                      <div className="ml-2 flex-1">
                        <div className="text-sm font-medium">{service.serviceName}</div>
                        <div className="h-2 w-full mt-1 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full" 
                            style={{ 
                              width: `${Math.min((service.incidents / service.total) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                      <div className="ml-2 text-sm text-muted-foreground">
                        {service.incidents} incidents
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceAnalytics;
