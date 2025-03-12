
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Queue } from '@/utils/types/group';
import { Plus } from 'lucide-react';

const QueueManagement: React.FC = () => {
  const mockQueues: Queue[] = [
    {
      id: 'q1',
      name: 'General Support',
      description: 'General IT support requests',
      filterCriteria: {
        ticketTypes: ['incident', 'service'],
        priorities: ['low', 'medium']
      },
      groupId: 'g1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Queue Management</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Queue
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Queue Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Ticket Types</TableHead>
            <TableHead>Group</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockQueues.map((queue) => (
            <TableRow key={queue.id}>
              <TableCell className="font-medium">{queue.name}</TableCell>
              <TableCell>{queue.description}</TableCell>
              <TableCell>{queue.filterCriteria.ticketTypes?.join(', ')}</TableCell>
              <TableCell>{queue.groupId}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QueueManagement;
