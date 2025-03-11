
import React, { useMemo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  isEqual, 
  getDay 
} from 'date-fns';
import { Task } from '@/utils/types/taskTypes';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskCalendarViewProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const TaskCalendarView: React.FC<TaskCalendarViewProps> = ({ tasks, onTaskClick }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  
  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentMonth]);
  
  const dayOfWeekStart = useMemo(() => getDay(startOfMonth(currentMonth)), [currentMonth]);
  
  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };
  
  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    
    tasks.forEach(task => {
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const dateKey = format(dueDate, 'yyyy-MM-dd');
        
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        
        grouped[dateKey].push(task);
      }
    });
    
    return grouped;
  }, [tasks]);
  
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>{format(currentMonth, 'MMMM yyyy')}</span>
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
          <Button variant="outline" size="sm" onClick={nextMonth} aria-label="Next month">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden border">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div 
            key={day} 
            className="p-2 text-center font-medium bg-card"
            aria-label={day}
          >
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the start of the month */}
        {Array.from({ length: dayOfWeekStart }).map((_, index) => (
          <div 
            key={`empty-start-${index}`} 
            className="bg-card p-2 h-28 sm:h-32"
            aria-hidden="true"
          />
        ))}
        
        {/* Calendar days */}
        {daysInMonth.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const dayTasks = tasksByDate[dateKey] || [];
          const isSelectedDate = isEqual(day, selectedDate);
          const isDayToday = isToday(day);
          
          return (
            <div 
              key={dateKey}
              className={`
                bg-card p-2 h-28 sm:h-32 relative transition-all
                ${isSelectedDate ? 'ring-2 ring-primary' : ''}
                ${isDayToday ? 'bg-primary/5' : ''}
                hover:bg-muted/10
              `}
              onClick={() => setSelectedDate(day)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelectedDate}
              aria-label={`${format(day, 'EEEE, MMMM d, yyyy')}${dayTasks.length > 0 ? `. ${dayTasks.length} tasks due` : ''}`}
            >
              <div className={`
                flex justify-center items-center w-6 h-6 rounded-full
                ${isDayToday ? 'bg-primary text-primary-foreground' : ''}
              `}>
                {format(day, 'd')}
              </div>
              
              <div className="mt-1 space-y-1 overflow-y-auto max-h-[80%]">
                {dayTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    className={`
                      text-xs p-1 rounded truncate cursor-pointer
                      ${task.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 
                      task.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' : 
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskClick(task.id);
                    }}
                    aria-label={`${task.title} - ${task.priority} priority`}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-center bg-muted p-1 rounded">
                    + {dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Empty cells for days after the end of the month */}
        {Array.from({ length: (7 - ((dayOfWeekStart + daysInMonth.length) % 7)) % 7 }).map((_, index) => (
          <div 
            key={`empty-end-${index}`} 
            className="bg-card p-2 h-28 sm:h-32"
            aria-hidden="true"
          />
        ))}
      </div>
      
      {/* Task list for selected date */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">
          Tasks for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h3>
        
        {tasksByDate[format(selectedDate, 'yyyy-MM-dd')]?.length ? (
          <div className="space-y-2">
            {tasksByDate[format(selectedDate, 'yyyy-MM-dd')].map((task) => (
              <div 
                key={task.id}
                className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onTaskClick(task.id)}
                role="button"
                tabIndex={0}
                aria-label={`${task.title}, ${task.priority} priority`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                  </div>
                  <Badge className={
                    task.priority === 'critical' ? 'bg-red-500' : 
                    task.priority === 'high' ? 'bg-orange-500' : 
                    task.priority === 'medium' ? 'bg-blue-500' : 'bg-green-500'
                  }>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No tasks due on this date
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCalendarView;
