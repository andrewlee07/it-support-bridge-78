
import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      count: number;
      label: string;
    };
  }>;
  totalTests: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  active, 
  payload, 
  totalTests 
}) => {
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

export default CustomTooltip;
