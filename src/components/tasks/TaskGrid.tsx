
import React from 'react';
import { Task } from '@/utils/types/taskTypes';
import TaskCard from './TaskCard';

interface TaskGridProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  isLoading?: boolean;
}

const TaskGrid: React.FC<TaskGridProps> = ({ tasks, onTaskClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 h-40">
            <div className="animate-pulse h-full flex flex-col justify-between">
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full w-24 mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded-full w-32 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-sm text-gray-500">There are no tasks matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div key={task.id} className="h-full">
          <TaskCard 
            task={task} 
            onClick={() => onTaskClick(task.id)} 
          />
        </div>
      ))}
    </div>
  );
};

export default TaskGrid;
