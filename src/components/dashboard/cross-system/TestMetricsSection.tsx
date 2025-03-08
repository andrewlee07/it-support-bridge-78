
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TestMetricsData } from '@/utils/types/dashboard';
import { Badge } from '@/components/ui/badge';

interface TestMetricsSectionProps {
  data: TestMetricsData;
}

const TestMetricsSection: React.FC<TestMetricsSectionProps> = ({ data }) => {
  // Prepare data for the coverage chart
  const coverageData = data.testCoverage.map(item => ({
    name: item.title,
    coverage: item.coverage,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Test Coverage & Metrics</span>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              Bug Fix Rate: {data.bugFixVelocity.toFixed(1)} days
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Test Effectiveness: {(data.testEffectiveness * 100).toFixed(0)}%
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {coverageData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">No test coverage data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={coverageData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Coverage']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="coverage" 
                  name="Test Coverage" 
                  stroke="#10b981" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.bugsByRelease.map((release) => (
            <div key={release.releaseId} className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span>{release.title}</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  Open: {release.open}
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Fixed: {release.fixed}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestMetricsSection;
