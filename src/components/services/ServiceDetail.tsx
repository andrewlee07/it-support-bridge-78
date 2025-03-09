
import React from 'react';
import { format } from 'date-fns';
import { ServiceWithCategory } from '@/utils/types/service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceDetailProps {
  service: ServiceWithCategory;
  onEditService: () => void;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  service,
  onEditService,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Button>
        <Button onClick={onEditService}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Service
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription>Service Details</CardDescription>
              </div>
              <Badge 
                variant={service.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                <span 
                  className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                    service.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`} 
                />
                {service.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Category</h3>
                <p className="text-sm text-muted-foreground mt-1">{service.category.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">ID</h3>
                <p className="text-sm text-muted-foreground mt-1">{service.id}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Created</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(new Date(service.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Last Updated</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(new Date(service.updatedAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Related Tickets</CardTitle>
            <CardDescription>Recent tickets associated with this service</CardDescription>
          </CardHeader>
          <CardContent>
            {/* This would be populated with actual related ticket data */}
            <div className="text-sm text-muted-foreground italic">
              No recent tickets for this service.
            </div>
            
            {/* Example of how tickets would be displayed
            <div className="space-y-2">
              <div className="p-2 border rounded hover:bg-muted/20 cursor-pointer">
                <div className="flex justify-between">
                  <span className="font-medium">INC-1234</span>
                  <Badge variant="outline">Open</Badge>
                </div>
                <p className="text-sm truncate">Cannot access Salesforce</p>
              </div>
            </div>
            */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetail;
