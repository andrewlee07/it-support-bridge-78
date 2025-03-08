
import { useState } from 'react';

export const useNewTicketDialog = () => {
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState<boolean>(false);

  const handleCreateTicket = () => {
    setIsNewTicketDialogOpen(true);
  };

  const handleCloseTicketDialog = () => {
    setIsNewTicketDialogOpen(false);
  };

  return {
    isNewTicketDialogOpen,
    handleCreateTicket,
    handleCloseTicketDialog,
    setIsNewTicketDialogOpen
  };
};
