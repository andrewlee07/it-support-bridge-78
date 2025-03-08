
import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedItem {
  id: string;
  title: string;
  type: string;
  status?: string;
}

interface RelatedItemsListProps {
  items: RelatedItem[];
  type: 'incident' | 'service';
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
      default:
        return '#';
    }
  };
  
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2 p-2 border rounded-md">
          <LinkIcon className="h-4 w-4 text-primary flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <Link 
              to={getItemPath(item)}
              className="text-primary hover:underline truncate"
            >
              {item.id}: {item.title}
            </Link>
            {item.status && (
              <span className={cn(
                "text-xs",
                item.status.toLowerCase().includes('closed') ? "text-green-600" : 
                item.status.toLowerCase().includes('in progress') ? "text-amber-600" : 
                "text-gray-500"
              )}>
                {item.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedItemsList;
