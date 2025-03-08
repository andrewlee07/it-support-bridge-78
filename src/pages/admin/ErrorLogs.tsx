
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertCircle, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ErrorLogsList } from '@/components/admin/error-logs/ErrorLogsList';
import { ErrorLogFilters } from '@/components/admin/error-logs/ErrorLogFilters';
import { ErrorLogDetails } from '@/components/admin/error-logs/ErrorLogDetails';
import { ErrorLogsHeader } from '@/components/admin/error-logs/ErrorLogsHeader';
import { useErrorLogs } from '@/hooks/admin/useErrorLogs';

const ErrorLogs: React.FC = () => {
  const { user, userCanPerformAction } = useAuth();
  
  const {
    logs,
    filters,
    setFilters,
    selectedLog,
    isDetailOpen,
    setIsDetailOpen,
    loadLogs,
    resetFilters,
    handleResolve,
    handleDelete,
    handleClearAll,
    handleRefresh,
    viewLogDetails
  } = useErrorLogs();

  const canAccessErrorLogs = userCanPerformAction('admin', 'read');

  useEffect(() => {
    if (canAccessErrorLogs) {
      loadLogs();
    }
  }, [canAccessErrorLogs]);

  if (!canAccessErrorLogs) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access the error logs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ErrorLogsHeader 
        onRefresh={handleRefresh} 
        onClearAll={handleClearAll} 
      />

      <ErrorLogFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={resetFilters}
      />

      <Card>
        <CardContent className="p-0">
          <ErrorLogsList
            logs={logs}
            onViewDetails={viewLogDetails}
            onResolve={handleResolve}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <ErrorLogDetails
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        selectedLog={selectedLog}
        onResolve={handleResolve}
      />
    </div>
  );
};

export default ErrorLogs;
