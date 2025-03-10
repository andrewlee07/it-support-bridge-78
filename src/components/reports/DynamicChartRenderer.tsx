
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig } from './ChartBuilder';
import PieChartRenderer from './chart-renderers/PieChartRenderer';
import BarChartRenderer from './chart-renderers/BarChartRenderer';
import LineChartRenderer from './chart-renderers/LineChartRenderer';
import NoDataPlaceholder from './chart-renderers/NoDataPlaceholder';
import { formatLineData, formatBarData } from './chart-renderers/DataFormatter';

interface DynamicChartRendererProps {
  config: ChartConfig;
  data: any[];
  onSegmentClick?: (value: string) => void;
}

const DynamicChartRenderer: React.FC<DynamicChartRendererProps> = ({
  config,
  data,
  onSegmentClick,
}) => {
  if (!data || data.length === 0) {
    return <NoDataPlaceholder title={config.name} />;
  }

  const commonProps = {
    margin: { top: 40, right: 80, bottom: 40, left: 80 },
  };

  const renderChart = () => {
    switch (config.chartType) {
      case 'pie':
        return (
          <PieChartRenderer 
            data={data} 
            onClick={onSegmentClick}
            commonProps={commonProps}
          />
        );
      case 'donut':
        return (
          <PieChartRenderer 
            data={data} 
            innerRadius={0.5}
            onClick={onSegmentClick}
            commonProps={commonProps}
          />
        );
      case 'bar':
        const barData = formatBarData(data, config.groupBy);
        return (
          <BarChartRenderer
            data={barData}
            keys={['value']}
            indexBy={config.groupBy || 'label'}
            xAxisLabel={config.xAxisLabel}
            yAxisLabel={config.yAxisLabel}
            onClick={onSegmentClick}
            commonProps={commonProps}
          />
        );
      case 'line':
      case 'area':
        const lineData = formatLineData(data, config.groupBy);
        return (
          <LineChartRenderer
            data={lineData}
            enableArea={config.chartType === 'area'}
            xAxisLabel={config.xAxisLabel}
            yAxisLabel={config.yAxisLabel}
            onClick={(value) => onSegmentClick && onSegmentClick(value)}
            commonProps={commonProps}
          />
        );
      default:
        return <div>Unsupported chart type: {config.chartType}</div>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{config.name}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default DynamicChartRenderer;
