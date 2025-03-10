
import React from 'react';
import { TopologyNode as TopologyNodeType } from '@/hooks/service-topology/topologyTypes';

interface TopologyNodeProps {
  node: TopologyNodeType & { x?: number; y?: number };
  isSelected: boolean;
  onClick: () => void;
}

export const TopologyNode: React.FC<TopologyNodeProps> = ({ node, isSelected, onClick }) => {
  if (!node.x || !node.y) return null;
  
  const radius = 20 + (node.value * 5);
  
  return (
    <g 
      transform={`translate(${node.x}, ${node.y})`}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Background circle for selection highlight */}
      {isSelected && (
        <circle 
          r={radius + 5} 
          fill="none" 
          stroke="#3b82f6" 
          strokeWidth={3} 
          strokeDasharray="5,3"
        />
      )}
      
      {/* Main node circle */}
      <circle 
        r={radius} 
        fill={node.color || '#cbd5e1'} 
        opacity={0.7}
        stroke={isSelected ? '#3b82f6' : '#64748b'}
        strokeWidth={isSelected ? 2 : 1}
      />
      
      {/* Node label */}
      <text 
        textAnchor="middle" 
        dy=".3em" 
        fill="#fff" 
        fontSize="10px"
        fontWeight={isSelected ? 'bold' : 'normal'}
      >
        {node.name.length > 12 ? node.name.substring(0, 10) + '...' : node.name}
      </text>
    </g>
  );
};
