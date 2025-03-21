import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import IncidentPageHeader from '@/components/incidents/header/IncidentPageHeader';
import IncidentDashboardStats from '@/components/incidents/dashboard/IncidentDashboardStats';
import IncidentFiltersBar from '@/components/incidents/filters/IncidentFiltersBar';
import IncidentTable from '@/components/incidents/table/IncidentTable';
import { useIncidents } from '@/hooks/useIncidents';
import { useNavigate } from 'react-router-dom';

const Incidents = () => {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  const {
    // State
    searchQuery,
    setSearchQuery,
    sortColumn,
    sortDirection,
    priorityFilter,
    setPriorityFilter,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    cardFilters,
    dateRange,
    setDateRange,
    expandedTicket,
    selectedTicket,
    
    // Helper functions
    handleSort,
    toggleCardFilter,
    formatDate,
    getTimeDifference,
    toggleExpandRow,
    handleEditTicket,
    getFilteredTickets,
    getTypeColor,
    getStatusColor,
    getPriorityColor,
    getPriorityIcon,
    resetFilters,
    hasActiveFilters,
    handleExport,
    
    // Data
    typeOptions,
    priorityOptions,
    statusOptions,
    activeTicketsCount,
    criticalTicketsCount,
    pendingTicketsCount,
    totalTickets
  } = useIncidents();
  
  // Get the filtered tickets
  const filteredTickets = getFilteredTickets();
  
  // Navigate to ticket detail view
  const goToTicketDetailView = useCallback((ticket: any) => {
    console.log(`Navigating to incident detail: ${ticket.id}`);
    navigate(`/incidents/${ticket.id}`);
  }, [navigate]);
  
  // Handle creating a new incident
  const handleCreateIncident = () => {
    toast.info('Create Incident', {
      description: 'This would open a dialog to create a new incident',
      duration: 3000,
    });
    // In a real implementation, you would open the create incident form:
    // setCreateDialogOpen(true);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header with export and create buttons */}
        <IncidentPageHeader 
          handleExport={handleExport} 
          handleCreateIncident={handleCreateIncident}
        />

        {/* Metrics Cards - Interactive Filters */}
        <IncidentDashboardStats
          totalTickets={totalTickets}
          activeTicketsCount={activeTicketsCount}
          criticalTicketsCount={criticalTicketsCount}
          pendingTicketsCount={pendingTicketsCount}
          cardFilters={cardFilters}
          toggleCardFilter={toggleCardFilter}
        />

        {/* Tabs for different incident types */}
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Incidents</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="service">Service Impacting</TabsTrigger>
            <TabsTrigger value="internal">Internal</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="py-4">
                <IncidentFiltersBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  hasActiveFilters={hasActiveFilters()}
                  resetFilters={resetFilters}
                  cardFilters={cardFilters}
                  priorityFilter={priorityFilter}
                  typeFilter={typeFilter}
                  statusFilter={statusFilter}
                  toggleCardFilter={toggleCardFilter}
                  setPriorityFilter={setPriorityFilter}
                  setTypeFilter={setTypeFilter}
                  setStatusFilter={setStatusFilter}
                  getTypeColor={getTypeColor}
                  getPriorityColor={getPriorityColor}
                  getStatusColor={getStatusColor}
                />
              </CardHeader>
              
              <CardContent className="p-0">
                <IncidentTable
                  tickets={filteredTickets}
                  expandedTicket={expandedTicket}
                  selectedTicket={selectedTicket}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  typeFilter={typeFilter}
                  statusFilter={statusFilter}
                  priorityFilter={priorityFilter}
                  typeOptions={typeOptions}
                  statusOptions={statusOptions}
                  priorityOptions={priorityOptions}
                  handleSort={handleSort}
                  toggleExpandRow={toggleExpandRow}
                  setTypeFilter={setTypeFilter}
                  setStatusFilter={setStatusFilter}
                  setPriorityFilter={setPriorityFilter}
                  getStatusColor={getStatusColor}
                  getTypeColor={getTypeColor}
                  getPriorityColor={getPriorityColor}
                  getPriorityIcon={getPriorityIcon}
                  formatDate={formatDate}
                  getTimeDifference={getTimeDifference}
                  handleViewTicket={goToTicketDetailView}
                  handleEditTicket={handleEditTicket}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs content would be similar to the 'all' tab */}
          <TabsContent value="critical" className="space-y-4">
            {/* Similar content as 'all' but filtered for critical incidents */}
          </TabsContent>
          
          <TabsContent value="service" className="space-y-4">
            {/* Similar content as 'all' but filtered for service impacting incidents */}
          </TabsContent>
          
          <TabsContent value="internal" className="space-y-4">
            {/* Similar content as 'all' but filtered for internal incidents */}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Incidents;
