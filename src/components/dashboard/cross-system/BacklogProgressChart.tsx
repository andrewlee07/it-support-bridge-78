
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BacklogProgressItem } from '@/utils/types/dashboard';

interface BacklogProgressChartProps {
  data: BacklogProgressItem[];
}

const BacklogProgressChart: React.FC<BacklogProgressChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backlog Progress by Release</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">No backlog data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    return [`${value}%`, name];
                  }}
                />
                <Legend />
                <Bar dataKey="completed" name="Completed" stackId="a" fill="#22c55e" />
                <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#3b82f6" />
                <Bar dataKey="notStarted" name="Not Started" stackId="a" fill="#d1d5db" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BacklogProgressChart;
