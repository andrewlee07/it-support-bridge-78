
import React from 'react';
import { TopologyLink as TopologyLinkType, TopologyNode as TopologyNodeType } from '@/hooks/service-topology/topologyTypes';

interface TopologyLinkProps {
  link: TopologyLinkType;
  nodes: (TopologyNodeType & { x?: number; y?: number })[];
}

export const TopologyLink: React.FC<TopologyLinkProps> = ({ link, nodes }) => {
  const source = nodes.find(n => n.id === link.source);
  const target = nodes.find(n => n.id === link.target);
  
  if (!source || !target || !source.x || !target.x) return null;
  
  // Determine link style based on relationship type
  let strokeDasharray = "none";
  let strokeWidth = 2;
  
  switch (link.type) {
    case 'depends-on':
      strokeWidth = 3;
      break;
    case 'related-to':
      strokeDasharray = "5,5";
      break;
    case 'component-of':
      strokeDasharray = "10,3";
      break;
  }
  
  return (
    <line 
      x1={source.x}
      y1={source.y}
      x2={target.x}
      y2={target.y}
      stroke="#888"
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      opacity={0.6}
    />
  );
};
