
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from '../TicketUpdateForm';
import { CloseTicketValues } from '../TicketCloseForm';
import { useTicketUpdate } from './useTicketUpdate';
import { useTicketClose } from './useTicketClose';
import { useTicketReopen } from './useTicketReopen';
import { useTicketNotes } from './useTicketNotes';
import { useNewTicketDialog } from './useNewTicketDialog';

interface UseTicketActionsProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
  type: 'incident' | 'service';
}

export const useTicketActions = (props: UseTicketActionsProps) => {
  const { handleUpdateTicket } = useTicketUpdate(props);
  const { handleCloseTicket } = useTicketClose(props);
  const { handleReopenTicket } = useTicketReopen(props);
  const { handleAddNote } = useTicketNotes(props);
  const { 
    isNewTicketDialogOpen, 
    handleCreateTicket, 
    handleCloseTicketDialog,
    setIsNewTicketDialogOpen
  } = useNewTicketDialog();

  return {
    isNewTicketDialogOpen,
    handleUpdateTicket,
    handleCloseTicket,
    handleReopenTicket,
    handleAddNote,
    handleCreateTicket,
    handleCloseTicketDialog,
    setIsNewTicketDialogOpen
  };
};
