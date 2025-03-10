import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { 
  ResponsiveBar 
} from '@nivo/bar';
import { 
  ResponsiveLine 
} from '@nivo/line';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig } from './ChartBuilder';

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
    return (
      <Card>
        <CardHeader>
          <CardTitle>{config.name}</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  const formatLineData = (inputData: any[]) => {
    if (inputData.length > 0 && 'id' in inputData[0] && 'data' in inputData[0]) {
      return inputData;
    }

    return [
      {
        id: "values",
        data: inputData.map(item => ({
          x: item.label,
          y: item.value
        }))
      }
    ];
  };

  const formatBarData = (inputData: any[]) => {
    if (inputData.length > 0 && config.groupBy && inputData[0][config.groupBy]) {
      return inputData;
    }

    return inputData.map(item => ({
      [config.groupBy || 'label']: item.label,
      value: item.value,
      color: item.color
    }));
  };

  const renderChart = () => {
    const commonProps = {
      margin: { top: 40, right: 80, bottom: 40, left: 80 },
    };

    switch (config.chartType) {
      case 'pie':
      case 'donut':
        return (
          <ResponsivePie
            data={data}
            {...commonProps}
            innerRadius={config.chartType === 'donut' ? 0.5 : 0}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'category10' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLabelsSkipAngle={10}
            arcLabelsRadiusOffset={0.55}
            enableArcLinkLabels={config.chartType !== 'donut'}
            onClick={(datum) => onSegmentClick && onSegmentClick(datum.id as string)}
          />
        );
      case 'bar':
        const barData = formatBarData(data);
        return (
          <ResponsiveBar
            data={barData}
            {...commonProps}
            keys={['value']}
            indexBy={config.groupBy || 'label'}
            padding={0.3}
            colors={{ scheme: 'category10' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: config.xAxisLabel || '',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: config.yAxisLabel || '',
              legendPosition: 'middle',
              legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            onClick={(datum) => onSegmentClick && onSegmentClick(datum.indexValue as string)}
          />
        );
      case 'line':
      case 'area':
        const lineData = formatLineData(data);
        return (
          <ResponsiveLine
            data={lineData}
            {...commonProps}
            enableArea={config.chartType === 'area'}
            enablePoints={true}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            useMesh={true}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: config.xAxisLabel || '',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: config.yAxisLabel || '',
              legendPosition: 'middle',
              legendOffset: -40
            }}
            onClick={(point) => {
              if (point.data && onSegmentClick) {
                onSegmentClick(point.data.x as string);
              }
            }}
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
