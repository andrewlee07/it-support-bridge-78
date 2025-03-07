
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockSLAs } from '@/utils/mockData';
import { SLA } from '@/utils/types';
import { Pencil, Trash2, Clock } from 'lucide-react';

interface SLAListProps {
  showActive: boolean;
}

const SLAList: React.FC<SLAListProps> = ({ showActive }) => {
  // Filter SLAs based on active status
  const filteredSLAs = mockSLAs.filter(sla => sla.isActive === showActive);
  
  // Utility function to get appropriate badge class for priority level
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
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
                <Badge variant="outline" className={getPriorityBadgeClass(sla.priorityLevel)}>
                  {sla.priorityLevel.charAt(0).toUpperCase() + sla.priorityLevel.slice(1)} Priority
                </Badge>
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
