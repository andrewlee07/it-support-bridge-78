
import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useSecurityCases } from '@/hooks/security/useSecurityCases';
import SecurityPageHeader from '@/components/security/header/SecurityPageHeader';
import SecurityDashboardStats from '@/components/security/dashboard/SecurityDashboardStats';
import SecurityFiltersBar from '@/components/security/filters/SecurityFiltersBar';
import SecurityCasesTable from '@/components/security/table/SecurityCasesTable';
import SecurityCaseDetail from '@/components/security/SecurityCaseDetail';
import { useAppNavigation } from '@/utils/routes/navigationUtils';

const SecurityManagement = () => {
  const navigation = useAppNavigation();
  // Add a state for the create case dialog
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
    expandedCase,
    selectedCase,
    viewDialogOpen,
    setViewDialogOpen,
    
    // Helper functions
    handleSort,
    toggleCardFilter,
    formatDate,
    getTimeDifference,
    toggleExpandRow,
    handleViewCase,
    handleEditCase,
    getFilteredCases,
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
    activeCasesCount,
    dataBreachesCount,
    complianceIssuesCount,
    totalCases
  } = useSecurityCases();

  // Get the filtered cases
  const filteredCases = getFilteredCases();

  // Navigate to case detail view
  const goToCaseDetailView = useCallback((caseId: string) => {
    console.log(`Navigating to security case detail: ${caseId}`);
    navigation.goToSecurityCaseDetail(caseId);
  }, [navigation]);

  // Handle creating a new security case
  const handleCreateCase = () => {
    toast.info('Create Security Case', {
      description: 'This would open a dialog to create a new security case',
      duration: 3000,
    });
    // In a real implementation, you would open the create case form:
    // setCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header with export and create buttons */}
      <SecurityPageHeader 
        handleExport={handleExport} 
        handleCreateCase={handleCreateCase}
      />

      {/* Metrics Cards - Interactive Filters */}
      <SecurityDashboardStats
        totalCases={totalCases}
        activeCasesCount={activeCasesCount}
        dataBreachesCount={dataBreachesCount}
        complianceIssuesCount={complianceIssuesCount}
        cardFilters={cardFilters}
        toggleCardFilter={toggleCardFilter}
      />

      {/* Tabs for different security case types */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Cases</TabsTrigger>
          <TabsTrigger value="data-breaches">Data Breaches</TabsTrigger>
          <TabsTrigger value="sar">Subject Access Requests</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <SecurityFiltersBar
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
              <SecurityCasesTable
                cases={filteredCases}
                expandedCase={expandedCase}
                selectedCase={selectedCase}
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
                handleViewCase={goToCaseDetailView}
                handleEditCase={handleEditCase}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Security Case Detail Dialog */}
      {selectedCase && (
        <SecurityCaseDetail
          securityCase={selectedCase}
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          isInline={false}
        />
      )}

      {/* Create Case Dialog would go here */}
      {/* We would implement a full dialog component in a real application */}
    </div>
  );
};

export default SecurityManagement;
