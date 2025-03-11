
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reminder, getSnoozeOptions } from '@/utils/types/reminderTypes';
import { CalendarDays, Clock, Bell, Check, X, AlertCircle } from 'lucide-react';
import { formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { snoozeReminder } from '@/utils/api/taskApi';
import { toast } from 'sonner';

interface ReminderCardProps {
  reminder: Reminder;
  onCompleteReminder?: (id: string) => void;
  onCancelReminder?: (id: string) => void;
  onEditReminder?: (reminder: Reminder) => void;
  onSnoozeReminder?: (id: string, duration: number) => void;
  onClick?: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ 
  reminder, 
  onCompleteReminder,
  onCancelReminder,
  onEditReminder,
  onSnoozeReminder,
  onClick 
}) => {
  // Get appropriate status styling
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'completed': return 'text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'snoozed': return 'text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'cancelled': return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
      default: return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  // Format the trigger time for display
  const formatTriggerTime = () => {
    if (!reminder.triggerTime) return 'No trigger time set';
    
    const triggerTime = new Date(reminder.triggerTime);
    
    if (isToday(triggerTime)) return `Today at ${triggerTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (isTomorrow(triggerTime)) return `Tomorrow at ${triggerTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (isPast(triggerTime)) return `Overdue (${formatDistanceToNow(triggerTime, { addSuffix: true })})`;
    
    return `${triggerTime.toLocaleDateString()} at ${triggerTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  // Get appropriate trigger time styling
  const getTriggerTimeColor = () => {
    if (!reminder.triggerTime) return 'text-gray-500';
    
    const triggerTime = new Date(reminder.triggerTime);
    
    if (isPast(triggerTime) && reminder.status === 'active') return 'text-red-600 font-medium';
    
    // Due soon (within 1 hour)
    const oneHour = 60 * 60 * 1000;
    if (triggerTime.getTime() - Date.now() < oneHour && reminder.status === 'active') 
      return 'text-orange-600';
    
    return 'text-gray-600';
  };

  // Handle the snooze action
  const handleSnooze = async (duration: number) => {
    try {
      if (onSnoozeReminder) {
        onSnoozeReminder(reminder.id, duration);
      } else {
        const result = await snoozeReminder(reminder.id, duration);
        if (result.success) {
          toast.success('Reminder snoozed');
        }
      }
    } catch (error) {
      console.error('Error snoozing reminder:', error);
      toast.error('Failed to snooze reminder');
    }
  };

  const getDeliveryMethodsText = () => {
    return reminder.deliveryMethods.map(method => {
      switch(method) {
        case 'in-app': return 'In-app';
        case 'email': return 'Email';
        case 'push': return 'Push';
        default: return method;
      }
    }).join(', ');
  };

  const getTriggerTypeIcon = () => {
    return reminder.triggerType === 'time-based' ? 
      <Clock className="h-4 w-4 mr-1" /> : 
      <AlertCircle className="h-4 w-4 mr-1" />;
  };

  return (
    <Card 
      className="shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-muted-foreground mb-1">{reminder.id}</div>
            <h3 className="text-lg font-semibold leading-tight">{reminder.title}</h3>
          </div>
          <Badge className={getStatusColor(reminder.status)}>
            {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {reminder.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {reminder.description}
          </p>
        )}
        <div className="grid gap-2">
          <div className="flex items-center text-sm">
            {getTriggerTypeIcon()}
            <span>{reminder.triggerType === 'time-based' ? 'Time-based' : 'Event-based'}</span>
          </div>
          {reminder.triggerTime && (
            <div className={`flex items-center text-sm ${getTriggerTimeColor()}`}>
              <CalendarDays className="h-4 w-4 mr-1" />
              {formatTriggerTime()}
            </div>
          )}
          <div className="flex items-center text-sm">
            <Bell className="h-4 w-4 mr-1" />
            <span>Delivery: {getDeliveryMethodsText()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {reminder.status === 'active' && (
          <div className="flex w-full justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onCompleteReminder?.(reminder.id);
              }}
            >
              <Check className="h-4 w-4 mr-1" />
              Complete
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" size="sm">Snooze</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {getSnoozeOptions().map((option) => (
                  <DropdownMenuItem 
                    key={option.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSnooze(option.value);
                    }}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onCancelReminder?.(reminder.id);
              }}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReminderCard;
