
import React from 'react';
import { format } from 'date-fns';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarEvent } from '@/utils/types/calendar';
import { ExternalLink, Calendar, Clock, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CalendarEventPopoverProps {
  event: CalendarEvent;
  onClose: () => void;
}

const CalendarEventPopover: React.FC<CalendarEventPopoverProps> = ({ 
  event,
  onClose
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    onClose();
    if (event.type === 'change') {
      navigate(`/changes/${event.entityId}`);
    } else {
      navigate(`/releases/${event.entityId}`);
    }
  };

  const renderStatus = (status: string) => {
    const statusColors = {
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'completed': 'bg-blue-100 text-blue-800 border-blue-200',
      'in-progress': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    const colorClass = statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200';
    
    return (
      <Badge 
        variant="outline"
        className={colorClass}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={!!event} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="pb-2">
          <div className="flex justify-between items-start">
            <DialogTitle>{event.title}</DialogTitle>
            <Badge 
              className={
                event.type === 'change' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-purple-100 text-purple-800'
              }
            >
              {event.type === 'change' ? 'Change' : 'Release'}
            </Badge>
          </div>
          <DialogDescription className="flex items-center mt-1">
            <span className="mr-1">{event.entityId}</span>
            {renderStatus(event.status)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-2">
          <div className="flex items-start">
            <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
            <div>
              <div className="font-medium">Date & Time</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                <br />
                {format(new Date(event.date), 'h:mm a')}
                {event.endDate && ` - ${format(new Date(event.endDate), 'h:mm a')}`}
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <User className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
            <div>
              <div className="font-medium">Owner</div>
              <div className="text-sm text-muted-foreground">{event.owner}</div>
            </div>
          </div>
          
          {event.description && (
            <div className="flex items-start">
              <FileText className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <div className="font-medium">Description</div>
                <div className="text-sm text-muted-foreground">{event.description}</div>
              </div>
            </div>
          )}

          {event.impact && (
            <div className="flex items-start">
              <Clock className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <div className="font-medium">Impact</div>
                <div className="text-sm text-muted-foreground">{event.impact}</div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={handleViewDetails}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventPopover;
