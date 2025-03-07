
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockSLAs } from '@/utils/mockData';
import { SLA } from '@/utils/types';
import { Pencil, Trash2, Clock, Tag } from 'lucide-react';

interface SLAListProps {
  showActive: boolean;
}

const SLAList: React.FC<SLAListProps> = ({ showActive }) => {
  // Filter SLAs based on active status
  const filteredSLAs = mockSLAs.filter(sla => sla.isActive === showActive);
  
  // Utility function to get appropriate badge class for priority level
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'P1':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'P2':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'P3':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'P4':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const getTicketTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'incident':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'service':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredSLAs.length > 0 ? (
        filteredSLAs.map((sla) => (
          <Card key={sla.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{sla.name}</CardTitle>
                <div className="flex gap-1">
                  <Badge variant="outline" className={getPriorityBadgeClass(sla.priorityLevel)}>
                    {sla.priorityLevel}
                  </Badge>
                  <Badge variant="outline" className={getTicketTypeBadgeClass(sla.ticketType)}>
                    {sla.ticketType === 'incident' ? 'Incident' : 'Service Request'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{sla.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Response Time: <strong>{sla.responseTimeHours} hours</strong></span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Resolution Time: <strong>{sla.resolutionTimeHours} hours</strong></span>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No SLAs found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {showActive 
              ? "No active SLAs. Click 'Add SLA' to create one." 
              : "No inactive SLAs. Deactivated SLAs will appear here."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SLAList;
