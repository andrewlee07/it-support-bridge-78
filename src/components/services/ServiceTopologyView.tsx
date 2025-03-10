
import React, { useRef, useState, useEffect } from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { useServiceTopology } from '@/hooks/useServiceTopology';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface ServiceTopologyViewProps {
  services: ServiceWithCategory[];
  onSelectService: (service: ServiceWithCategory) => void;
}

const ServiceTopologyView: React.FC<ServiceTopologyViewProps> = ({ 
  services,
  onSelectService
}) => {
  const { topologyData, selectedService, setSelectedService } = useServiceTopology(services);
  const [scale, setScale] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

  // Zoom controls
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => {
    setScale(1);
    setDragOffset({ x: 0, y: 0 });
  };

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

  // Render the topology
  const renderTopology = () => {
    if (topologyData.nodes.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No service relationships</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              There are no relationships defined between services.
            </p>
          </div>
        </div>
      );
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
          {topologyData.links.map((link, index) => {
            const source = topologyData.nodes.find(n => n.id === link.source);
            const target = topologyData.nodes.find(n => n.id === link.target);
            
            if (!source || !target || !(source as any).x || !(target as any).x) return null;
            
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
                key={`link-${index}`}
                x1={(source as any).x}
                y1={(source as any).y}
                x2={(target as any).x}
                y2={(target as any).y}
                stroke="#888"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                opacity={0.6}
              />
            );
          })}
          
          {/* Draw service nodes */}
          {topologyData.nodes.map((node) => {
            const isSelected = node.id === selectedService;
            const radius = 20 + (node.value * 5);
            
            return (
              <g 
                key={`node-${node.id}`} 
                transform={`translate(${(node as any).x}, ${(node as any).y})`}
                onClick={() => handleNodeClick(node.id)}
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
          })}
        </g>
      </svg>
    );
  };

  return (
    <Card className="h-full shadow-sm border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Service Topology</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetZoom}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Interactive view of service relationships. Drag to move, click on services to select.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)] min-h-[400px]">
        <div className="relative h-full">
          {renderTopology()}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 p-2 rounded-md shadow-md text-xs border">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
              <span>Inactive</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Deprecated</span>
            </div>
          </div>
          <div className="mt-2 border-t pt-1">
            <div className="flex items-center">
              <div className="w-8 border-t-2 border-gray-500 mr-1"></div>
              <span>Related</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 border-t-2 border-gray-500 border-dashed mr-1"></div>
              <span>Component</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 border-t-3 border-gray-500 mr-1"></div>
              <span>Depends On</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTopologyView;
