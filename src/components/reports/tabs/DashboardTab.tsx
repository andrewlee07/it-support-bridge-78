
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import { ChartConfig } from '@/components/reports/ChartBuilder';

interface DashboardTabProps {
  savedCharts: ChartConfig[];
  setIsCreating: (isCreating: boolean) => void;
  onSegmentClick: (value: string) => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ 
  savedCharts, 
  setIsCreating, 
  onSegmentClick 
}) => {
  return (
    <div className="space-y-6">
      {savedCharts.length === 0 ? (
        <div className="text-center py-12 border rounded-md bg-muted/10">
          <h2 className="text-xl font-medium mb-2">No custom charts yet</h2>
          <p className="text-muted-foreground mb-4">
            Create your first custom chart to see it here
          </p>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Chart
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedCharts.map(chart => (
            <DynamicChartRenderer
              key={chart.id}
              config={chart}
              data={[]} // Data will be passed from the parent
              onSegmentClick={onSegmentClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardTab;
