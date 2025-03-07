import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TestStatus } from '@/utils/types/testTypes';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BarChart, PieChart as PieChartIcon, Filter } from 'lucide-react';

// Define status colors that match the existing StatusBadge components
const STATUS_COLORS = {
  'pass': '#10b981', // Green for pass
  'fail': '#ef4444', // Red for fail
  'blocked': '#f59e0b', // Yellow/Orange for blocked
  'not-run': '#6b7280', // Gray for not run
};

// Define status labels for better readability
const STATUS_LABELS = {
  'pass': 'Passed',
  'fail': 'Failed',
  'blocked': 'Blocked',
  'not-run': 'Not Run',
};

interface StatusCount {
  status: TestStatus;
  count: number;
  color: string;
  label: string;
}

interface TestStatusChartProps {
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  onFilterByStatus?: (status: TestStatus | null) => void;
}

const TestStatusChart: React.FC<TestStatusChartProps> = ({
  passedTests,
  failedTests,
  blockedTests,
  notRunTests,
  onFilterByStatus,
}) => {
  const [viewMode, setViewMode] = useState<'percentage' | 'count'>('percentage');
  const [chartType, setChartType] = useState<'pie' | 'donut'>('donut');

  // Prepare data for the chart
  const totalTests = passedTests + failedTests + blockedTests + notRunTests;
  
  const chartData: StatusCount[] = [
    { status: 'pass' as TestStatus, count: passedTests, color: STATUS_COLORS['pass'], label: STATUS_LABELS['pass'] },
    { status: 'fail' as TestStatus, count: failedTests, color: STATUS_COLORS['fail'], label: STATUS_LABELS['fail'] },
    { status: 'blocked' as TestStatus, count: blockedTests, color: STATUS_COLORS['blocked'], label: STATUS_LABELS['blocked'] },
    { status: 'not-run' as TestStatus, count: notRunTests, color: STATUS_COLORS['not-run'], label: STATUS_LABELS['not-run'] },
  ].filter(item => item.count > 0); // Only show statuses that have counts > 0

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.count / totalTests) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-2 border shadow-md rounded-md">
          <p className="font-medium">{data.label}</p>
          <p>Count: {data.count}</p>
          <p>Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend that allows filtering when clicked
  const CustomLegend = () => (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {chartData.map((entry) => (
        <div 
          key={entry.status}
          className="flex items-center cursor-pointer hover:opacity-80"
          onClick={() => onFilterByStatus && onFilterByStatus(entry.status)}
        >
          <div
            className="w-3 h-3 mr-1"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">
            {entry.label}: {viewMode === 'percentage' 
              ? `${((entry.count / totalTests) * 100).toFixed(1)}%`
              : entry.count
            }
          </span>
        </div>
      ))}
      {onFilterByStatus && (
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 ml-2"
          onClick={() => onFilterByStatus(null)}
        >
          <span className="text-sm text-primary underline">Clear filter</span>
        </div>
      )}
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle>Test Status Distribution</CardTitle>
          <CardDescription>
            Distribution of test case statuses
          </CardDescription>
        </div>
        
        <div className="flex space-x-1">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode(viewMode === 'percentage' ? 'count' : 'percentage')}
                  className="h-8 w-8"
                >
                  {viewMode === 'percentage' ? '#' : '%'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle between percentage and count view</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>

          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChartType(chartType === 'pie' ? 'donut' : 'pie')}
                  className="h-8 w-8"
                >
                  {chartType === 'pie' ? <PieChartIcon className="h-4 w-4" /> : <BarChart className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle chart type</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>

          {onFilterByStatus && (
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFilterByStatus(null)}
                    className="h-8 w-8"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear filters</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-[250px] w-full">
          {totalTests > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={chartType === 'donut' ? 40 : 0}
                    dataKey="count"
                    nameKey="label"
                    label={({ name, percent }) => 
                      viewMode === 'percentage' 
                        ? `${(percent * 100).toFixed(0)}%`
                        : ''
                    }
                    onClick={(data) => onFilterByStatus && onFilterByStatus(data.status)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <CustomLegend />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No test data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestStatusChart;
