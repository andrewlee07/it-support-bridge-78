
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface BarChartProps {
  data: any[];
  keys: string[];
  indexBy: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  onClick?: (datum: any) => void;
  commonProps: any;
}

const BarChartRenderer: React.FC<BarChartProps> = ({
  data,
  keys,
  indexBy,
  xAxisLabel,
  yAxisLabel,
  onClick,
  commonProps
}) => {
  return (
    <ResponsiveBar
      data={data}
      {...commonProps}
      keys={keys}
      indexBy={indexBy}
      padding={0.3}
      colors={{ scheme: 'category10' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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
      labelSkipWidth={12}
      labelSkipHeight={12}
      onClick={(datum) => onClick && onClick(datum.indexValue as string)}
    />
  );
};

export default BarChartRenderer;
