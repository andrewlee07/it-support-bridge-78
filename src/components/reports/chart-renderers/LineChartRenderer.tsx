
import React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface LineChartProps {
  data: any[];
  enableArea?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  onClick?: (point: any) => void;
  commonProps: any;
}

const LineChartRenderer: React.FC<LineChartProps> = ({
  data,
  enableArea = false,
  xAxisLabel,
  yAxisLabel,
  onClick,
  commonProps
}) => {
  return (
    <ResponsiveLine
      data={data}
      {...commonProps}
      enableArea={enableArea}
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
        legend: xAxisLabel || '',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisLabel || '',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      onClick={(point) => {
        if (point.data && onClick) {
          onClick(point.data.x as string);
        }
      }}
    />
  );
};

export default LineChartRenderer;
