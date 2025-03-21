import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ServiceRequestDashboardStats from '@/components/service-requests/dashboard/ServiceRequestDashboardStats';
import ServiceRequestFiltersBar from '@/components/service-requests/filters/ServiceRequestFiltersBar';
import ServiceRequestTable from '@/components/service-requests/table/ServiceRequestTable';
import { useServiceRequests } from '@/hooks/useServiceRequests';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ServiceRequests = () => {
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
    highPriorityCount,
    pendingApprovalCount,
    totalTickets
  } = useServiceRequests();
  
  // Get the filtered tickets
  const filteredTickets = getFilteredTickets();
  
  // Navigate to ticket detail view
  const goToTicketDetailView = useCallback((ticket: any) => {
    console.log(`Navigating to service request detail: ${ticket.id}`);
    navigate(`/service-requests/${ticket.id}`);
  }, [navigate]);
  
  // Handle creating a new service request
  const handleCreateServiceRequest = () => {
    toast.info('Create Service Request', {
      description: 'This would open a dialog to create a new service request',
      duration: 3000,
    });
    // In a real implementation, you would open the create service request form:
    // setCreateDialogOpen(true);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header with export and create buttons */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Service Request Management</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  Export to CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  Export to PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button onClick={handleCreateServiceRequest}>
              <FilePlus className="mr-2 h-4 w-4" />
              Create Request
            </Button>
          </div>
        </div>

        {/* Metrics Cards - Interactive Filters */}
        <ServiceRequestDashboardStats
          totalTickets={totalTickets}
          activeTicketsCount={activeTicketsCount}
          highPriorityCount={highPriorityCount}
          pendingApprovalCount={pendingApprovalCount}
          cardFilters={cardFilters}
          toggleCardFilter={toggleCardFilter}
        />

        {/* Tabs for different service request types */}
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="it-equipment">IT Equipment</TabsTrigger>
            <TabsTrigger value="access">Access Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="py-4">
                <ServiceRequestFiltersBar
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
                <ServiceRequestTable
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
          <TabsContent value="pending" className="space-y-4">
            {/* Similar content as 'all' but filtered for pending approval requests */}
          </TabsContent>
          
          <TabsContent value="it-equipment" className="space-y-4">
            {/* Similar content as 'all' but filtered for IT equipment requests */}
          </TabsContent>
          
          <TabsContent value="access" className="space-y-4">
            {/* Similar content as 'all' but filtered for access requests */}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ServiceRequests;
