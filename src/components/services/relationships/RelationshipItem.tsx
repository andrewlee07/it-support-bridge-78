
import React from 'react';
import { 
  ServiceRelationship, 
  ServiceWithRelationships 
} from '@/utils/types/service';
import { 
  ArrowRight, 
  Link2, 
  Network,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  getServiceById, 
  getServiceWithRelationships 
} from '@/utils/mockData/services/servicesData';

interface RelationshipItemProps {
  relationship: ServiceRelationship;
  service: ServiceWithRelationships;
  onDelete: () => void;
}

const RelationshipItem: React.FC<RelationshipItemProps> = ({
  relationship,
  service,
  onDelete
}) => {
  const isSource = relationship.sourceServiceId === service.id;
  const otherServiceId = isSource ? relationship.targetServiceId : relationship.sourceServiceId;
  const otherService = getServiceById(otherServiceId);
  
  if (!otherService) return null;
  
  const getRelationshipIcon = () => {
    switch (relationship.relationshipType) {
      case 'parent-child':
        return <Link2 className="h-4 w-4" />;
      case 'technical-business':
        return <Network className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };
  
  const getRelationshipTypeLabel = () => {
    switch (relationship.relationshipType) {
      case 'parent-child':
        if (isSource) {
          return 'Child of';
        } else {
          return 'Parent of';
        }
      case 'technical-business':
        if (service.serviceType === 'technical') {
          if (isSource) {
            return 'Supports';
          } else {
            return 'Supported by';
          }
        } else {
          if (isSource) {
            return 'Supported by';
          } else {
            return 'Supports';
          }
        }
      default:
        return 'Related to';
    }
  };
  
  const getStrengthBadgeClass = () => {
    switch (relationship.strength) {
      case 'weak':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'strong':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getServiceTypeLabel = (serviceType: string) => {
    return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
  };
  
  return (
    <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-md border">
      <div className="flex items-center space-x-2">
        {getRelationshipIcon()}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{getRelationshipTypeLabel()}</span>
            <span className="text-sm font-medium">{otherService.name}</span>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              getStrengthBadgeClass()
            )}>
              {relationship.strength}
            </span>
          </div>
          {otherService.serviceType && (
            <span className="text-xs text-muted-foreground">
              {getServiceTypeLabel(otherService.serviceType)} Service
            </span>
          )}
          {relationship.description && (
            <p className="text-xs text-muted-foreground mt-1">{relationship.description}</p>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default RelationshipItem;
