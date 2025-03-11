
import React from 'react';
import { Task } from '@/utils/types/taskTypes';
import TaskCard from './TaskCard';

interface TaskGridProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const TaskGrid: React.FC<TaskGridProps> = ({ tasks, onTaskClick }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div key={task.id}>
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
