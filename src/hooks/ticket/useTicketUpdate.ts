import { useState } from 'react';
import { TicketStatus, TicketWithNotes, PendingSubStatus } from '@/utils/types/ticket';
import { UpdateTicketValues } from '@/components/tickets/TicketUpdateForm';
import { createAuditEntry } from '@/utils/auditUtils';
import { AuditEntry } from '@/utils/types/audit';

export const useTicketUpdate = (
  ticket: TicketWithNotes | null,
  setTicket: (ticket: TicketWithNotes | null) => void
) => {
  const handleUpdateTicket = (values: UpdateTicketValues) => {
    if (ticket) {
      // Extract special fields from the update data
      const { _relatedItems, ...standardValues } = values as UpdateTicketValues & { 
        _relatedItems?: any[] 
      };

      // Ensure pendingSubStatus is properly typed
      let pendingSubStatus: PendingSubStatus | undefined;
      if (standardValues.pendingSubStatus) {
        pendingSubStatus = standardValues.pendingSubStatus as PendingSubStatus;
      }

      // Create an audit entry for this update
      const newAuditEntry: AuditEntry = createAuditEntry(
        ticket.id,
        'ticket',
        `Ticket updated: Status changed to ${standardValues.status}`,
        'current-user'
      );

      // Keep existing notes array, don't replace it with the notes string from the form
      const updatedTicket = {
        ...ticket,
        ...standardValues,
        pendingSubStatus,
        status: standardValues.status as TicketStatus,
        updatedAt: new Date(),
        // Keep existing notes array instead of replacing it
        notes: ticket.notes || [],
        // Update related items if provided
        ...((_relatedItems !== undefined) ? { relatedItems: _relatedItems } : {}),
        // Add the new audit entry to the existing ones
        audit: [...(ticket.audit || []), newAuditEntry]
      };

      setTicket(updatedTicket);
      
      // If there's a note in the update, add it
      if (values.notes?.trim()) {
        return values.notes;
      }
    }
    return null;
  };

  return { handleUpdateTicket };
};
