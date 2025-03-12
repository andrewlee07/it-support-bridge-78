
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Task Dashboard</h1>
        <p className="text-muted-foreground">Overview of your assigned tasks</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate('/tasks')}>
          View All Tasks
        </Button>
        <Button onClick={() => navigate('/tasks/create')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
