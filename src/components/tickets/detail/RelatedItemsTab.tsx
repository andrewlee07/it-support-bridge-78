
import React from 'react';
import { Ticket } from '@/utils/types/ticket';

export interface RelatedItemsTabProps {
  ticket?: Ticket;
}

const RelatedItemsTab: React.FC<RelatedItemsTabProps> = ({
  ticket
}) => {
  return (
    <div>
      <h2>Related Items Tab</h2>
      <p>This is a placeholder for related items.</p>
    </div>
  );
};

export default RelatedItemsTab;
