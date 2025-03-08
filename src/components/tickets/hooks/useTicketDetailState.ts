
import { useState } from 'react';
import { ReopenFormValues } from '../detail/ReopenDialog';
import { UpdateTicketValues } from '../TicketUpdateForm';
import { CloseTicketValues } from '../TicketCloseForm';

export const useTicketDetailState = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);

  // Event handler functions
  const handleUpdateSubmit = (
    onUpdate: ((data: UpdateTicketValues) => void) | undefined,
    onUpdateTicket: ((data: UpdateTicketValues) => void) | undefined,
    data: UpdateTicketValues
  ) => {
    if (onUpdate) onUpdate(data);
    if (onUpdateTicket) onUpdateTicket(data);
    setActiveTab('details');
  };

  const handleCloseSubmit = (
    onClose: ((data: CloseTicketValues) => void) | undefined, 
    onCloseTicket: ((data: CloseTicketValues) => void) | undefined,
    data: CloseTicketValues
  ) => {
    if (onClose) onClose(data);
    if (onCloseTicket) onCloseTicket(data);
    setActiveTab('details');
  };

  const handleReopenSubmit = (
    onReopen: ((reason: string) => void) | undefined,
    onReopenTicket: ((reason: string) => void) | undefined,
    data: ReopenFormValues
  ) => {
    if (onReopen) onReopen(data.reason);
    if (onReopenTicket) onReopenTicket(data.reason);
    setIsReopenDialogOpen(false);
  };

  return {
    activeTab,
    setActiveTab,
    isReopenDialogOpen,
    setIsReopenDialogOpen,
    handleUpdateSubmit,
    handleCloseSubmit,
    handleReopenSubmit
  };
};
