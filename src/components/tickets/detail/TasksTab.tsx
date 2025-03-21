
import React from 'react';

interface TasksTabProps {
  parentId: string;
  parentType: string;
}

const TasksTab: React.FC<TasksTabProps> = ({
  parentId,
  parentType
}) => {
  return (
    <div>
      <h2>Tasks Tab</h2>
      <p>This is a placeholder for the tasks related to this item.</p>
    </div>
  );
};

export default TasksTab;
