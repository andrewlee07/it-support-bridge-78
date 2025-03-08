import { useState, useEffect } from 'react';
import { getTicketById } from '@/utils/mockData/tickets';
import { Ticket, TicketStatus, RelatedItem, PendingSubStatus, TicketNote } from '@/utils/types/ticket';
import { UpdateTicketValues } from '@/components/tickets/TicketUpdateForm';
import { CloseTicketValues } from '@/components/tickets/TicketCloseForm';
import { toast } from 'sonner';
import { createAuditEntry } from '@/utils/auditUtils';
import { AuditEntry } from '@/utils/types/audit';

interface TicketWithNotes extends Ticket {
  notes: TicketNote[];
}

export const useTicketDetail = (id: string | undefined) => {
  const [ticket, setTicket] = useState<TicketWithNotes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedTicket = getTicketById(id);
          if (fetchedTicket) {
            // Initialize notes array if it doesn't exist
            setTicket({
              ...fetchedTicket,
              notes: fetchedTicket.notes || [],
              // Add sample related items for testing
              relatedItems: fetchedTicket.relatedItems || [],
              // Make sure audit is initialized
              audit: fetchedTicket.audit || []
            });
          } else {
            setError('Ticket not found');
          }
        } else {
          setError('Invalid ticket ID');
        }
      } catch (err) {
        setError('Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleUpdateTicket = (values: UpdateTicketValues) => {
    if (ticket) {
      // Extract special fields from the update data
      const { _relatedItems, ...standardValues } = values as UpdateTicketValues & { 
        _relatedItems?: RelatedItem[] 
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
        handleAddNote(values.notes);
      }
    }
  };

  const handleCloseTicket = (values: CloseTicketValues) => {
    if (ticket) {
      // Check if there are any unresolved related items
      const hasUnresolvedItems = (ticket.relatedItems || []).some(item => {
        if (item.type === 'bug') {
          return !['closed', 'resolved', 'fixed'].includes(item.status.toLowerCase());
        }
        return false;
      });

      if (hasUnresolvedItems) {
        toast.error('Cannot close ticket with unresolved bugs');
        return;
      }

      // Add a new note to the notes array with the close information
      const closeNote: TicketNote = {
        id: `note-close-${Date.now()}`,
        ticketId: ticket.id, // Add the required ticketId
        text: values.notes,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      // Create an audit entry for closing the ticket
      const closeAuditEntry: AuditEntry = createAuditEntry(
        ticket.id,
        'ticket',
        `Ticket closed: ${values.closureReason || 'No reason provided'}`,
        'current-user'
      );
      
      const updatedTicket = {
        ...ticket,
        status: values.status as TicketStatus,
        updatedAt: new Date(),
        closedAt: new Date(),
        // Keep existing notes and append the new close note
        notes: [...(ticket.notes || []), closeNote],
        // Add the close audit entry
        audit: [...(ticket.audit || []), closeAuditEntry],
        // Store additional values in a way that doesn't conflict with the Ticket type
        _rootCause: values.rootCause,
        _closureReason: values.closureReason,
        resolution: values.resolution
      };
      setTicket(updatedTicket);
      
      toast.success('Ticket closed successfully');
    }
  };

  const handleAddNote = (note: string) => {
    if (ticket) {
      const noteItem: TicketNote = {
        id: `note-${Date.now()}`,
        ticketId: ticket.id, // Add the required ticketId
        text: note,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      // Create an audit entry for adding a note
      const noteAuditEntry: AuditEntry = createAuditEntry(
        ticket.id,
        'ticket',
        `Note added: ${note.substring(0, 30)}${note.length > 30 ? '...' : ''}`,
        'current-user'
      );
      
      const updatedTicket = {
        ...ticket,
        notes: [...(ticket.notes || []), noteItem],
        audit: [...(ticket.audit || []), noteAuditEntry],
        updatedAt: new Date()
      };
      setTicket(updatedTicket);
      toast.success("Note added successfully");
    }
  };

  const handleReopenTicket = (reason: string) => {
    if (ticket) {
      const reopenNote: TicketNote = {
        id: `note-reopen-${Date.now()}`,
        ticketId: ticket.id, // Add the required ticketId
        text: `Ticket reopened: ${reason}`,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      // Create an audit entry for reopening the ticket
      const reopenAuditEntry: AuditEntry = createAuditEntry(
        ticket.id,
        'ticket',
        `Ticket reopened: ${reason}`,
        'current-user'
      );
      
      const updatedTicket = {
        ...ticket,
        status: 'open' as TicketStatus,
        updatedAt: new Date(),
        reopenedAt: new Date(),
        notes: [...(ticket.notes || []), reopenNote],
        audit: [...(ticket.audit || []), reopenAuditEntry],
        _reopenReason: reason
      };
      setTicket(updatedTicket);
      
      toast.success('Ticket reopened successfully');
    }
  };

  return {
    ticket,
    loading,
    error,
    handleUpdateTicket,
    handleCloseTicket: handleCloseTicket,
    handleAddNote: handleAddNote, 
    handleReopenTicket: handleReopenTicket
  };
};
