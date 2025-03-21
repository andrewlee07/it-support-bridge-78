
import React from 'react';
import { Ticket } from '@/utils/types/ticket';

export interface TimelineTabProps {
  ticket?: Ticket;
  onAddNote?: (note: string) => void;
}

const TimelineTab: React.FC<TimelineTabProps> = ({
  ticket,
  onAddNote
}) => {
  return (
    <div>
      <h2>Timeline Tab</h2>
      <p>This is a placeholder for the ticket timeline.</p>
    </div>
  );
};

export default TimelineTab;
