
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BacklogReporting: React.FC = () => {
  const { currentView, handleViewChange } = useBacklogViews();

  // Sample data for the chart - in a real application, this would come from your backlog data
  const statusData = [
    { name: 'Open', count: 12 },
    { name: 'In Progress', count: 8 },
    { name: 'Ready', count: 5 },
    { name: 'Blocked', count: 3 },
    { name: 'Completed', count: 15 },
  ];

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Backlog Reporting</h1>
            <BacklogViewSelector 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Items by Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Backlog Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm text-gray-500">Total Items</p>
                      <p className="text-2xl font-bold">43</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-2xl font-bold">15</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm text-gray-500">In Progress</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-sm text-gray-500">Blocked</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </PageTransition>
  );
};

export default BacklogReporting;
