import React from 'react';

// This component is no longer needed as Nivo provides its own tooltip functionality
// We're keeping it as an empty component to avoid breaking existing imports
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

const CustomTooltip: React.FC<CustomTooltipProps> = () => {
  // Nivo now handles the tooltip rendering
  return null;
};

export default CustomTooltip;
