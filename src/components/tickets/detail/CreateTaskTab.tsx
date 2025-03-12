
import React from 'react';
import TaskForm from '@/components/tasks/TaskForm';
import { Task } from '@/utils/types/taskTypes';
import { Ticket } from '@/utils/types/ticket';

interface CreateTaskTabProps {
  ticket: Ticket;
  onTaskCreated: (task: Task) => void;
  onCancel: () => void;
}

const CreateTaskTab: React.FC<CreateTaskTabProps> = ({ 
  ticket, 
  onTaskCreated,
  onCancel 
}) => {
  // Pre-populate task data from the ticket
  const initialTaskData = {
    title: `Task for ${ticket.type === 'incident' ? 'Incident' : 'Service Request'}: ${ticket.title}`,
    description: `Related to ${ticket.type === 'incident' ? 'Incident' : 'Service Request'} #${ticket.id}\n\n${ticket.description || ''}`,
    priority: ticket.priority === 'P1' || ticket.priority === 'P2' ? 'high' : 
              ticket.priority === 'P3' ? 'medium' : 'low',
    relatedItemId: ticket.id,
    relatedItemType: ticket.type === 'incident' ? 'incident' : 'service-request'
  } as Partial<Task>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create Task from {ticket.type === 'incident' ? 'Incident' : 'Service Request'}</h2>
      <p className="text-muted-foreground">
        Create a new task based on this {ticket.type === 'incident' ? 'incident' : 'service request'}.
        The task will be linked to this {ticket.type === 'incident' ? 'incident' : 'service request'}.
      </p>
      <TaskForm
        initialData={initialTaskData as any}
        onTaskCreated={onTaskCreated}
        onCancel={onCancel}
      />
    </div>
  );
};

export default CreateTaskTab;
