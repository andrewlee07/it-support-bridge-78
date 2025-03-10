
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { useServiceTopology } from '@/hooks/useServiceTopology';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertTriangle } from 'lucide-react';

interface ServiceRelationshipsTabProps {
  service: ServiceWithCategory;
  services: ServiceWithCategory[];
  onSelectService: (service: ServiceWithCategory) => void;
}

const ServiceRelationshipsTab: React.FC<ServiceRelationshipsTabProps> = ({
  service,
  services,
  onSelectService
}) => {
  const { getRelatedServices } = useServiceTopology(services);
  const relatedServices = getRelatedServices(service.id);

  const getRelationshipTypeLabel = (sourceId: string, targetId: string) => {
    // In a real app, fetch the actual relationship type from your data
    if (sourceId === service.id) {
      return 'Depends on';
    } else {
      return 'Used by';
    }
  };

  if (relatedServices.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <AlertTriangle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-2 text-lg font-medium">No related services</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This service does not have any relationships defined with other services.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Service Relationships</h3>
      <p className="text-sm text-muted-foreground">
        This view shows other services that are related to {service.name}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedServices.map((relatedService) => (
          <Card key={relatedService.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex justify-between items-center">
                <span>{relatedService.name}</span>
                <Badge
                  variant={relatedService.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {relatedService.status}
                </Badge>
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                {relatedService.category.name}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3 line-clamp-2">{relatedService.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {getRelationshipTypeLabel(service.id, relatedService.id)}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onSelectService(relatedService)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceRelationshipsTab;
