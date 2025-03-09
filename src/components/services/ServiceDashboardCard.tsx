
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockServiceTicketCounts } from '@/utils/mockData/services';

export const ServiceDashboardCard = () => {
  // Calculate total number of service requests
  const totalServiceRequests = mockServiceTicketCounts.reduce(
    (sum, service) => sum + service.requests,
    0
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalServiceRequests}</div>
      </CardContent>
    </Card>
  );
};
