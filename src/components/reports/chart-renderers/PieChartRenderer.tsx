
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface PieChartProps {
  data: any[];
  innerRadius?: number;
  onClick?: (datum: any) => void;
  commonProps: any;
}

const PieChartRenderer: React.FC<PieChartProps> = ({ 
  data, 
  innerRadius = 0,
  onClick,
  commonProps 
}) => {
  return (
    <ResponsivePie
      data={data}
      {...commonProps}
      innerRadius={innerRadius}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'category10' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLabelsSkipAngle={10}
      arcLabelsRadiusOffset={0.55}
      enableArcLinkLabels={innerRadius !== 0.5}
      onClick={(datum) => onClick && onClick(datum.id as string)}
    />
  );
};

export default PieChartRenderer;
