
import React from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { BacklogItem } from '@/utils/types/backlogTypes';

interface Release {
  id: string;
  title: string;
}

interface BacklogItemTableProps {
  backlogItems: BacklogItem[];
  releases: Release[];
  onViewItem: (item: BacklogItem) => void;
}

const BacklogItemTable: React.FC<BacklogItemTableProps> = ({
  backlogItems,
  releases,
  onViewItem
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'deferred':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Release</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {backlogItems.map((item) => {
            const release = releases.find(r => r.id === item.releaseId);
            
            return (
              <TableRow key={item.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => onViewItem(item)}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {release ? (
                    <Badge variant="outline">
                      {release.title}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>
                  {item.dueDate ? (
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                      {format(new Date(item.dueDate), 'MMM d, yyyy')}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No due date</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    onViewItem(item);
                  }}>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BacklogItemTable;
