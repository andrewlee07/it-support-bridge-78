
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopologyControls } from './TopologyControls';
import { TopologyVisualization } from './TopologyVisualization';
import { TopologyLegend } from './TopologyLegend';

interface ServiceTopologyViewProps {
  services: ServiceWithCategory[];
  onSelectService: (service: ServiceWithCategory) => void;
}

const ServiceTopologyView: React.FC<ServiceTopologyViewProps> = ({ 
  services,
  onSelectService
}) => {
  const [scale, setScale] = React.useState(1);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => {
    setScale(1);
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <Card className="h-full shadow-sm border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Service Topology</span>
          <TopologyControls 
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />
        </CardTitle>
        <CardDescription>
          Interactive view of service relationships. Drag to move, click on services to select.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)] min-h-[400px]">
        <div className="relative h-full">
          <TopologyVisualization 
            services={services}
            onSelectService={onSelectService}
            scale={scale}
            dragOffset={dragOffset}
            setDragOffset={setDragOffset}
          />
        </div>

        <TopologyLegend />
      </CardContent>
    </Card>
  );
};

export default ServiceTopologyView;
