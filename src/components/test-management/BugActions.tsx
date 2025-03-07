
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Pencil, MoreVertical, Bookmark, CheckCircle, XCircle } from 'lucide-react';
import { BugStatus } from '@/utils/types/testTypes';

interface BugActionsProps {
  bugId: string;
  onView: () => void;
  onEdit: () => void;
  onStatusUpdate: (status: BugStatus) => void;
}

const BugActions: React.FC<BugActionsProps> = ({ 
  bugId, 
  onView, 
  onEdit, 
  onStatusUpdate 
}) => {
  return (
    <div className="flex space-x-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={onView}
        title="View"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Status Update</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onStatusUpdate('in-progress')}>
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Mark In Progress</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusUpdate('fixed')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Mark Fixed</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusUpdate('verified')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Mark Verified</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusUpdate('closed')}>
            <XCircle className="mr-2 h-4 w-4" />
            <span>Close Bug</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BugActions;
