
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TasksTabProps {
  parentId: string;
  parentType: 'incident' | 'service-request' | 'security';
}

const TasksTab: React.FC<TasksTabProps> = ({ parentId, parentType }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <div className="text-center py-8 text-muted-foreground">
          No tasks found for this {parentType}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksTab;
