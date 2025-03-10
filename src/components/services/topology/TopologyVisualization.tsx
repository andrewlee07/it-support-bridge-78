
import React, { useRef, useState, useEffect } from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { useServiceTopology } from '@/hooks/useServiceTopology';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { TopologyNode } from './components/TopologyNode';
import { TopologyLink } from './components/TopologyLink';
import { TopologyEmptyState } from './components/TopologyEmptyState';
import { useTopologyLayout } from '@/hooks/service-topology/useTopologyLayout';

interface TopologyVisualizationProps {
  services: ServiceWithCategory[];
  onSelectService: (service: ServiceWithCategory) => void;
  scale: number;
  dragOffset: { x: number; y: number };
  setDragOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

export const TopologyVisualization: React.FC<TopologyVisualizationProps> = ({
  services,
  onSelectService,
  scale,
  dragOffset,
  setDragOffset
}) => {
  const { topologyData, selectedService, setSelectedService } = useServiceTopology(services);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);

  // Use the new hook to handle node positioning
  const { positionedNodes } = useTopologyLayout(topologyData, dimensions);

  useEffect(() => {
    // Update dimensions based on container size
    const updateDimensions = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        const { width, height } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragOffset(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedService(nodeId);
    const service = services.find(s => s.id === nodeId);
    if (service) {
      onSelectService(service);
      toast.info(`Selected service: ${service.name}`);
    }
  };

  if (topologyData.nodes.length === 0) {
    return <TopologyEmptyState />;
  }

  const transformValue = `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${scale})`;

  return (
    <svg 
      ref={svgRef}
      width={dimensions.width} 
      height={dimensions.height}
      className="cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <g style={{ transform: transformValue, transformOrigin: 'center' }}>
        {/* Draw relationship links */}
        {topologyData.links.map((link, index) => (
          <TopologyLink 
            key={`link-${index}`}
            link={link}
            nodes={positionedNodes}
          />
        ))}
        
        {/* Draw service nodes */}
        {positionedNodes.map((node) => (
          <TopologyNode 
            key={`node-${node.id}`}
            node={node}
            isSelected={node.id === selectedService}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </g>
    </svg>
  );
};
