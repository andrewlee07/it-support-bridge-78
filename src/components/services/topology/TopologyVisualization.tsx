
import React, { useRef, useState, useEffect } from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { useServiceTopology } from '@/hooks/useServiceTopology';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { TopologyNode } from './components/TopologyNode';
import { TopologyLink } from './components/TopologyLink';
import { TopologyEmptyState } from './components/TopologyEmptyState';

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

  // Calculate node positions using a force-based layout simulation
  useEffect(() => {
    if (topologyData.nodes.length === 0) return;

    // Simple force-directed layout (in a real app, use d3-force or similar)
    // This is a very simplified version for demonstration
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
    
    // Position nodes in a circle for this basic implementation
    const angleStep = (2 * Math.PI) / topologyData.nodes.length;
    
    topologyData.nodes.forEach((node, i) => {
      const angle = i * angleStep;
      (node as any).x = centerX + radius * Math.cos(angle);
      (node as any).y = centerY + radius * Math.sin(angle);
    });
    
    // Force update to trigger re-render
    setDimensions({...dimensions});
  }, [topologyData, dimensions]);

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
            nodes={topologyData.nodes}
          />
        ))}
        
        {/* Draw service nodes */}
        {topologyData.nodes.map((node) => (
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
