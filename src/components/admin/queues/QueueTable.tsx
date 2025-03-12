
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Queue } from '@/utils/types/group';
import { Pencil, Trash } from 'lucide-react';

interface QueueTableProps {
  queues: Queue[];
  onEdit: (queue: Queue) => void;
  onDelete: (queueId: string) => void;
}

const QueueTable: React.FC<QueueTableProps> = ({ queues, onEdit, onDelete }) => {
  return (
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
        {queues.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No queues found. Create your first queue to get started.
            </TableCell>
          </TableRow>
        ) : (
          queues.map((queue) => (
            <TableRow key={queue.id}>
              <TableCell className="font-medium">{queue.name}</TableCell>
              <TableCell>{queue.description}</TableCell>
              <TableCell>{queue.filterCriteria.ticketTypes?.join(', ')}</TableCell>
              <TableCell>{queue.groupId}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(queue)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(queue.id)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default QueueTable;
