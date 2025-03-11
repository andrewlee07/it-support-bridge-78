
import React, { useState, useMemo } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';
import { useBacklogFetch } from '@/hooks/backlog/kanban/useBacklogFetch';
import { format, addDays, addMonths, differenceInDays, eachWeekOfInterval, eachDayOfInterval, startOfMonth, endOfMonth, parseISO, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  CalendarIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon, 
  ZoomInIcon, 
  ZoomOutIcon, 
  FilterIcon,
  ChartGantt
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Status color mapping
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'blocked':
      return 'bg-red-500';
    case 'ready':
      return 'bg-yellow-500';
    case 'deferred':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const BacklogTimeline: React.FC = () => {
  const { currentView, handleViewChange } = useBacklogViews();
  const { backlogItems, isLoading } = useBacklogFetch();
  
  // Timeline display controls
  const [zoom, setZoom] = useState<number>(7); // Days to display per column
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [displayDays, setDisplayDays] = useState<number>(60); // Number of days to display
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  
  // Calculate the date range to display
  const dateRange = useMemo(() => {
    const end = addDays(startDate, displayDays);
    return { start: startDate, end };
  }, [startDate, displayDays]);

  // Generate column headers (dates)
  const columnDates = useMemo(() => {
    // Get the weeks in the interval
    const weeks = eachWeekOfInterval({
      start: dateRange.start,
      end: dateRange.end
    });
    
    return weeks.map(weekStart => {
      const weekEnd = endOfWeek(weekStart);
      return {
        weekStart,
        weekEnd,
        label: `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`
      };
    });
  }, [dateRange]);

  // Filter and prepare backlog items for display
  const timelineItems = useMemo(() => {
    if (!backlogItems) return [];
    
    return backlogItems
      .filter(item => {
        // Filter by status if filters are active
        if (statusFilter.length > 0 && !statusFilter.includes(item.status)) {
          return false;
        }
        
        // Only include items with a due date
        return !!item.dueDate;
      })
      .map(item => {
        // Calculate the item's timeline position and width
        const startDateStr = item.createdAt.toString();
        const dueDateStr = item.dueDate ? item.dueDate.toString() : item.updatedAt.toString();
        
        const itemStartDate = new Date(startDateStr);
        const itemEndDate = new Date(dueDateStr);
        
        // Calculate days from start of timeline
        const startOffset = Math.max(0, differenceInDays(itemStartDate, dateRange.start));
        const duration = Math.max(1, differenceInDays(itemEndDate, itemStartDate));
        
        return {
          ...item,
          startOffset,
          duration,
          startDate: itemStartDate,
          endDate: itemEndDate
        };
      })
      .sort((a, b) => a.id.localeCompare(b.id)); // Sort by ID for stable order
  }, [backlogItems, dateRange, statusFilter]);

  // Navigate the timeline
  const handlePreviousPeriod = () => {
    setStartDate(prev => addDays(prev, -Math.floor(displayDays / 2)));
  };

  const handleNextPeriod = () => {
    setStartDate(prev => addDays(prev, Math.floor(displayDays / 2)));
  };

  // Zoom controls
  const handleZoomIn = () => {
    setDisplayDays(prev => Math.max(30, prev - 15));
  };

  const handleZoomOut = () => {
    setDisplayDays(prev => prev + 15);
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(prev => !prev);
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  // Get all available statuses from backlog items
  const availableStatuses = useMemo(() => {
    if (!backlogItems) return [];
    const statuses = new Set<string>();
    backlogItems.forEach(item => {
      statuses.add(item.status);
    });
    return Array.from(statuses);
  }, [backlogItems]);

  // Calculate positions for the Gantt bars
  const calculateItemPosition = (item: any) => {
    // Base calculation: how many days from the start of our view
    const startPosition = differenceInDays(item.startDate, dateRange.start);
    const endPosition = startPosition + item.duration;
    
    // Convert to percentage of total timeline width
    const startPercent = Math.max(0, (startPosition / displayDays) * 100);
    const widthPercent = Math.min(100 - startPercent, (item.duration / displayDays) * 100);
    
    return {
      left: `${startPercent}%`,
      width: `${widthPercent}%`
    };
  };

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <ChartGantt className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Backlog Timeline</h1>
            </div>
            <div className="flex items-center gap-4">
              <BacklogViewSelector 
                currentView={currentView}
                onViewChange={handleViewChange}
              />
            </div>
          </div>

          <Card className="border rounded-md bg-white dark:bg-gray-800 mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPeriod}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPeriod}
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {format(dateRange.start, 'MMM d, yyyy')} - {format(dateRange.end, 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFilterPanel}
                  >
                    <FilterIcon className="h-4 w-4 mr-1" />
                    Filters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                  >
                    <ZoomOutIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                  >
                    <ZoomInIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {showFilterPanel && (
                <div className="mt-4 p-4 border rounded-md bg-muted/50">
                  <h3 className="font-medium mb-2">Filter by Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableStatuses.map(status => (
                      <Badge
                        key={status}
                        variant={statusFilter.includes(status) ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => toggleStatusFilter(status)}
                      >
                        {status.replace('-', ' ')}
                      </Badge>
                    ))}
                    {statusFilter.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStatusFilter([])}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border rounded-md bg-white dark:bg-gray-800">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-6 w-[150px]" />
                      <div className="ml-8 space-y-2">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : timelineItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 p-6">
                  <ChartGantt className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No items to display</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                    There are no backlog items with dates to display in the timeline view.
                  </p>
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Timeline header */}
                    <div className="flex border-b sticky top-0 bg-card z-10">
                      {/* Left sidebar for item names */}
                      <div className="w-64 min-w-[250px] p-2 border-r bg-muted/50 flex justify-center items-center">
                        <span className="font-semibold text-sm">Backlog Items</span>
                      </div>
                      
                      {/* Timeline columns */}
                      <div className="flex-1 flex">
                        {columnDates.map((column, index) => (
                          <div key={index} className="flex-1 min-w-[100px] p-2 border-r text-center">
                            <div className="text-xs font-medium text-muted-foreground">
                              {format(column.weekStart, 'MMM')}
                            </div>
                            <div className="text-xs">
                              {format(column.weekStart, 'd')} - {format(column.weekEnd, 'd')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Timeline rows */}
                    <div className="relative">
                      {timelineItems.map((item, index) => (
                        <div key={item.id} className={cn(
                          "flex border-b hover:bg-accent/20 transition-colors",
                          index % 2 === 0 ? "bg-card" : "bg-muted/10"
                        )}>
                          {/* Item info */}
                          <div className="w-64 min-w-[250px] p-3 border-r flex flex-col justify-center">
                            <div className="flex items-center gap-2">
                              <div className={cn("w-3 h-3 rounded-full", getStatusColor(item.status))}></div>
                              <span className="text-sm font-medium">{item.id}</span>
                            </div>
                            <div className="text-sm line-clamp-1 mt-1 font-medium">{item.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs capitalize">
                                {item.status.replace('-', ' ')}
                              </Badge>
                              {item.priority && (
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "text-xs",
                                    item.priority === 'high' ? "border-red-500 text-red-600" :
                                    item.priority === 'medium' ? "border-yellow-500 text-yellow-600" :
                                    "border-blue-500 text-blue-600"
                                  )}
                                >
                                  {item.priority}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Timeline bar container */}
                          <div className="flex-1 relative p-2 flex items-center">
                            {/* Gantt bar */}
                            <div 
                              className={cn(
                                "absolute h-8 rounded-sm shadow-md flex items-center px-2 cursor-pointer transition-all hover:shadow-lg border-l-4",
                                getStatusColor(item.status),
                                item.status === 'completed' ? "opacity-80" : "opacity-70 hover:opacity-100"
                              )}
                              style={calculateItemPosition(item)}
                              title={`${item.title} (${format(item.startDate, 'MMM d')} - ${format(item.endDate, 'MMM d')})`}
                            >
                              <span className="text-xs font-medium text-white truncate">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    </PageTransition>
  );
};

export default BacklogTimeline;
