
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BarChart, PieChart as PieChartIcon, Filter } from 'lucide-react';

interface ChartControlsProps {
  viewMode: 'percentage' | 'count';
  setViewMode: (mode: 'percentage' | 'count') => void;
  chartType: 'pie' | 'donut';
  setChartType: (type: 'pie' | 'donut') => void;
  onFilterByStatus?: (status: null) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  viewMode,
  setViewMode,
  chartType,
  setChartType,
  onFilterByStatus
}) => {
  return (
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
  );
};

export default ChartControls;
