
import { useTicketFetch } from './ticket/useTicketFetch';
import { useTicketUpdate } from './ticket/useTicketUpdate';
import { useTicketClose } from './ticket/useTicketClose';
import { useTicketNotes } from './ticket/useTicketNotes';
import { useTicketReopen } from './ticket/useTicketReopen';
import { UpdateTicketValues } from '@/components/tickets/TicketUpdateForm';
import { CloseTicketValues } from '@/components/tickets/TicketCloseForm';

export const useTicketDetail = (id: string | undefined) => {
  const { ticket, setTicket, loading, error } = useTicketFetch(id);
  const { handleUpdateTicket } = useTicketUpdate(ticket, setTicket);
  const { handleCloseTicket } = useTicketClose(ticket, setTicket);
  const { handleAddNote } = useTicketNotes(ticket, setTicket);
  const { handleReopenTicket } = useTicketReopen(ticket, setTicket);

  const updateTicket = (values: UpdateTicketValues) => {
    const note = handleUpdateTicket(values);
    if (note) {
      handleAddNote(note);
    }
  };

  return {
    ticket,
    loading,
    error,
    handleUpdateTicket: updateTicket,
    handleCloseTicket,
    handleAddNote,
    handleReopenTicket
  };
};
