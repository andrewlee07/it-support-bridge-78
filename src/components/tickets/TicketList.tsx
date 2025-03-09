
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import TicketFilters from './TicketFilters';
import TicketLoadingState from './TicketLoadingState';
import TicketEmptyState from './TicketEmptyState';
import TicketGrid from './TicketGrid';
import TicketTable from './TicketTable';
import TicketDialogs from './TicketDialogs';
import TicketViewToggle, { ViewType } from './TicketViewToggle';
import { useTicketList } from './hooks/useTicketList';

interface TicketListProps {
  type: 'incident' | 'service';
}

const TicketList: React.FC<TicketListProps> = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewType, setViewType] = useState<ViewType>(() => {
    // Get from localStorage or default to grid
    const savedView = localStorage.getItem(`ticket-view-${type}`);
    return (savedView as ViewType) || 'grid';
  });

  const {
    filteredTickets,
    searchQuery,
    statusFilter,
    priorityFilter,
    loading,
    isNewTicketDialogOpen,
    isViewingTicket,
    selectedTicket,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    handleUpdateTicket,
    handleCloseTicket,
    handleAddNote,
    handleCreateTicket,
    handleCloseTicketDialog,
    handleTicketCreated,
    setIsViewingTicket,
    handleReopenTicket
  } = useTicketList(type, id);

  const handleCardClick = (ticketId: string) => {
    const basePath = type === 'incident' ? '/incidents' : '/service-requests';
    console.log(`Navigating to ${basePath}/${ticketId}`);
    navigate(`${basePath}/${ticketId}`);
  };

  const handleCloseViewDialog = () => {
    const basePath = type === 'incident' ? '/incidents' : '/service-requests';
    navigate(basePath);
  };

  // Save view preference
  const handleViewChange = (view: ViewType) => {
    setViewType(view);
    localStorage.setItem(`ticket-view-${type}`, view);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {type === 'incident' ? 'Incidents' : 'Service Requests'}
        </h1>
        <div className="flex items-center gap-2">
          <TicketViewToggle view={viewType} onChange={handleViewChange} />
          <Button onClick={handleCreateTicket}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New {type === 'incident' ? 'Incident' : 'Request'}
          </Button>
        </div>
      </div>

      <TicketFilters 
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        type={type}
      />

      {loading ? (
        <TicketLoadingState />
      ) : filteredTickets.length === 0 ? (
        <TicketEmptyState 
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          type={type}
        />
      ) : viewType === 'grid' ? (
        <TicketGrid 
          tickets={filteredTickets} 
          onTicketClick={handleCardClick} 
        />
      ) : (
        <TicketTable
          tickets={filteredTickets}
          onTicketClick={handleCardClick}
        />
      )}

      <TicketDialogs
        type={type}
        isNewTicketDialogOpen={isNewTicketDialogOpen}
        isViewingTicket={isViewingTicket}
        selectedTicket={selectedTicket}
        onNewTicketDialogOpenChange={handleCloseTicketDialog}
        onViewDialogClose={handleCloseViewDialog}
        onTicketCreated={handleTicketCreated}
        onTicketUpdate={handleUpdateTicket}
        onTicketClose={handleCloseTicket}
        onAddNote={handleAddNote}
        onReopenTicket={handleReopenTicket}
      />
    </div>
  );
};

export default TicketList;
