
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChartConfig } from '../ChartBuilder';

interface SavedChartsListProps {
  savedCharts: ChartConfig[];
  onEdit: (chart: ChartConfig) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

const SavedChartsList: React.FC<SavedChartsListProps> = ({
  savedCharts,
  onEdit,
  onDelete,
  onCreateNew,
}) => {
  if (savedCharts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No saved charts yet</p>
        <Button 
          variant="outline" 
          className="mt-2"
          onClick={onCreateNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Chart
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {savedCharts.map(chart => (
        <div 
          key={chart.id} 
          className="flex items-center justify-between p-3 border rounded-md hover:bg-accent"
        >
          <div>
            <h3 className="font-medium">{chart.name}</h3>
            <p className="text-sm text-muted-foreground">
              {chart.chartType} chart using {chart.dataSource} data
            </p>
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(chart)}
            >
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(chart.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedChartsList;
