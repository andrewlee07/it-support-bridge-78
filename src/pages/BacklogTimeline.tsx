
import React, { useState, useMemo } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';
import { useBacklogFetch } from '@/hooks/backlog/kanban/useBacklogFetch';
import { format } from 'date-fns';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BacklogTimeline: React.FC = () => {
  const { currentView, handleViewChange } = useBacklogViews();
  const { backlogItems, isLoading } = useBacklogFetch();
  const [timeframe, setTimeframe] = useState<'month' | 'quarter'>('month');

  const sortedItems = useMemo(() => {
    if (!backlogItems) return [];
    return [...backlogItems].sort((a, b) => {
      // Sort by due date if available, otherwise by updated date
      const dateA = a.dueDate ? new Date(a.dueDate) : new Date(a.updatedAt);
      const dateB = b.dueDate ? new Date(b.dueDate) : new Date(b.updatedAt);
      return dateA.getTime() - dateB.getTime();
    });
  }, [backlogItems]);

  // Group backlog items by month or quarter
  const groupedItems = useMemo(() => {
    const groups: Record<string, BacklogItem[]> = {};
    
    sortedItems.forEach(item => {
      const date = item.dueDate ? new Date(item.dueDate) : new Date(item.updatedAt);
      let groupKey: string;
      
      if (timeframe === 'month') {
        groupKey = format(date, 'MMMM yyyy');
      } else {
        // For quarters, calculate the quarter number (1-4)
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        groupKey = `Q${quarter} ${date.getFullYear()}`;
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    });
    
    return groups;
  }, [sortedItems, timeframe]);

  // Create timeline entries
  const timelineEntries = useMemo(() => {
    return Object.entries(groupedItems).sort((a, b) => {
      // Simple string comparison works for our formatted dates
      return a[0].localeCompare(b[0]);
    });
  }, [groupedItems]);

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Backlog Timeline</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-muted rounded-md p-1">
                <button 
                  className={`px-3 py-1 rounded-sm text-sm ${timeframe === 'month' ? 'bg-background shadow' : ''}`}
                  onClick={() => setTimeframe('month')}
                >
                  Monthly
                </button>
                <button 
                  className={`px-3 py-1 rounded-sm text-sm ${timeframe === 'quarter' ? 'bg-background shadow' : ''}`}
                  onClick={() => setTimeframe('quarter')}
                >
                  Quarterly
                </button>
              </div>
              <BacklogViewSelector 
                currentView={currentView}
                onViewChange={handleViewChange}
              />
            </div>
          </div>

          <Card className="border rounded-md bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-6">
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
              ) : timelineEntries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <CalendarIcon className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No items to display</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                    There are no backlog items with dates to display in the timeline view.
                  </p>
                </div>
              ) : (
                <div className="relative space-y-6">
                  {/* Line connecting timeline items */}
                  <div className="absolute top-8 bottom-0 left-[18px] w-[2px] bg-border z-0"></div>
                  
                  {timelineEntries.map(([period, items]) => (
                    <div key={period} className="relative z-10">
                      <h3 className="text-lg font-semibold flex items-center mb-4">
                        <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-4">
                          {timeframe === 'month' ? period.substring(0, 1) : period.substring(0, 2)}
                        </span>
                        {period}
                      </h3>
                      <div className="ml-[52px] space-y-3">
                        {items.map(item => (
                          <div 
                            key={item.id} 
                            className="border rounded-md p-4 bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">{item.id}</span>
                                <h4 className="text-base font-medium">{item.title}</h4>
                              </div>
                              <Badge className={`
                                ${item.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                                ${item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : ''}
                                ${item.status === 'blocked' ? 'bg-red-100 text-red-800' : ''}
                                ${item.status === 'open' ? 'bg-gray-100 text-gray-800' : ''}
                              `}>
                                {item.status.replace('-', ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CalendarIcon className="h-3 w-3" />
                                <span>
                                  {item.dueDate 
                                    ? format(new Date(item.dueDate), 'MMM d, yyyy')
                                    : format(new Date(item.updatedAt), 'MMM d, yyyy')}
                                </span>
                              </div>
                              <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
