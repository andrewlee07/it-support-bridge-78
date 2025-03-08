
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Bug, ListChecks, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTicketById } from '@/utils/mockData/tickets';
import { getProblemById } from '@/utils/mockData/problems';

interface RelatedItem {
  id: string;
  title?: string;
  type: string;
  status?: string;
}

interface RelatedItemsListProps {
  items: RelatedItem[];
  type?: 'incident' | 'service' | 'problem';
}

const RelatedItemsList: React.FC<RelatedItemsListProps> = ({ items, type }) => {
  // Helper function to determine the link path based on item type
  const getItemPath = (item: RelatedItem) => {
    switch (item.type.toLowerCase()) {
      case 'bug':
        return `/bugs/${item.id}`;
      case 'backlog':
        return `/backlog/${item.id}`;
      case 'problem':
        return `/problems/${item.id}`;
      case 'incident':
        return `/incidents/${item.id}`;
      case 'service':
        return `/service-requests/${item.id}`;
      default:
        return '#';
    }
  };

  // Helper function to get the item title if not provided
  const getItemTitle = (item: RelatedItem) => {
    if (item.title) return item.title;
    
    // If no title provided, try to fetch it based on type
    if (item.type.toLowerCase() === 'incident' || item.type.toLowerCase() === 'service') {
      const ticket = getTicketById(item.id);
      return ticket ? ticket.title : item.id;
    } else if (item.type.toLowerCase() === 'problem') {
      const problem = getProblemById(item.id);
      return problem ? problem.title : item.id;
    }
    
    return item.id;
  };

  // Helper function to get the appropriate icon based on item type
  const getItemIcon = (itemType: string) => {
    switch (itemType.toLowerCase()) {
      case 'bug':
        return <Bug className="h-4 w-4 text-red-500 flex-shrink-0" />;
      case 'backlog':
        return <ListChecks className="h-4 w-4 text-blue-500 flex-shrink-0" />;
      case 'problem':
        return <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />;
      case 'incident':
      case 'service':
      default:
        return <LinkIcon className="h-4 w-4 text-primary flex-shrink-0" />;
    }
  };
  
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2 p-2 border rounded-md">
          {getItemIcon(item.type)}
          <div className="flex flex-col min-w-0">
            <Link 
              to={getItemPath(item)}
              className="text-primary hover:underline truncate"
            >
              {item.id}: {getItemTitle(item)}
            </Link>
            {item.status && (
              <span className={cn(
                "text-xs",
                item.status.toLowerCase().includes('closed') ? "text-green-600" : 
                item.status.toLowerCase().includes('in progress') || item.status.toLowerCase().includes('under') ? "text-amber-600" : 
                "text-gray-500"
              )}>
                {item.status}
              </span>
            )}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-muted-foreground text-sm">No related items found.</p>
      )}
    </div>
  );
};

export default RelatedItemsList;
