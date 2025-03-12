
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskGrid from '@/components/tasks/TaskGrid';
import { Task } from '@/utils/types/taskTypes';

interface TaskSectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tasks: Task[];
  emptyMessage: string;
  viewAllLink?: string;
  viewAllState?: any;
  borderColor: string;
  maxItems?: number;
}

const TaskSectionCard: React.FC<TaskSectionCardProps> = ({
  title,
  description,
  icon,
  tasks,
  emptyMessage,
  viewAllLink,
  viewAllState,
  borderColor,
  maxItems = 6
}) => {
  const navigate = useNavigate();
  
  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleViewAll = () => {
    if (viewAllLink) {
      navigate(viewAllLink, { state: viewAllState });
    }
  };

  const displayTasks = tasks.slice(0, maxItems);
  const hasMoreTasks = tasks.length > maxItems;

  return (
    <Card className={`mb-6 border-l-4 ${borderColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">{emptyMessage}</p>
        ) : (
          <TaskGrid tasks={displayTasks} onTaskClick={handleTaskClick} />
        )}
      </CardContent>
      {hasMoreTasks && viewAllLink && (
        <CardFooter>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto" 
            onClick={handleViewAll}
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskSectionCard;
