
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockServiceTicketCounts } from '@/utils/mockData/services';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

interface ServiceTicketsReportProps {
  onDownload?: () => void;
}

const ServiceTicketsReport: React.FC<ServiceTicketsReportProps> = ({ onDownload }) => {
  const [period, setPeriod] = useState('30days');
  const [viewType, setViewType] = useState<'incidents' | 'requests' | 'total'>('total');
  
  const getChartData = () => {
    return mockServiceTicketCounts.map(item => ({
      name: item.serviceName,
      incidents: item.incidents,
      requests: item.requests,
      total: item.total
    }));
  };
  
  const getBarColor = () => {
    switch (viewType) {
      case 'incidents':
        return '#ef4444'; // Red for incidents
      case 'requests':
        return '#3b82f6'; // Blue for requests
      case 'total':
      default:
        return '#8b5cf6'; // Purple for total
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Simple CSV export
      const headers = ['Service Name', 'Incidents', 'Requests', 'Total'];
      const data = mockServiceTicketCounts.map(item => 
        [item.serviceName, item.incidents, item.requests, item.total].join(',')
      );
      
      const csvContent = [
        headers.join(','),
        ...data
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `service-tickets-report-${new Date().toISOString().split('T')[0]}.csv`);
      link.click();
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Tickets by Service</CardTitle>
            <CardDescription>
              Distribution of tickets across IT services
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={viewType} onValueChange={(value: any) => setViewType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incidents">Incidents</SelectItem>
                <SelectItem value="requests">Requests</SelectItem>
                <SelectItem value="total">Total</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getChartData()}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey={viewType} 
                fill={getBarColor()}
                name={viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTicketsReport;
