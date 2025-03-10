
import { useState, useEffect } from 'react';
import { TopologyData, TopologyNode } from './topologyTypes';

interface LayoutDimensions {
  width: number;
  height: number;
}

interface NodeWithPosition extends TopologyNode {
  x?: number;
  y?: number;
}

export function useTopologyLayout(
  topologyData: TopologyData,
  dimensions: LayoutDimensions
) {
  const [positionedNodes, setPositionedNodes] = useState<NodeWithPosition[]>([]);

  // Calculate node positions using a simple circular layout
  useEffect(() => {
    if (topologyData.nodes.length === 0 || !dimensions.width || !dimensions.height) return;

    // Simple circular layout arrangement
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
    
    // Position nodes in a circle
    const angleStep = (2 * Math.PI) / topologyData.nodes.length;
    
    const nodesWithPositions = topologyData.nodes.map((node, i) => {
      const angle = i * angleStep;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });
    
    setPositionedNodes(nodesWithPositions);
  }, [topologyData.nodes, dimensions]);

  return { positionedNodes };
}
