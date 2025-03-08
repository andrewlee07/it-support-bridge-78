
import { useState, useEffect } from 'react';
import { 
  ErrorLog, 
  getErrorLogs, 
  filterErrorLogs, 
  resolveErrorLog, 
  deleteErrorLog, 
  clearAllErrorLogs 
} from '@/utils/logging/errorLogger';

interface FilterState {
  severity: string;
  resolved: string;
  search: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export const useErrorLogs = () => {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    severity: '',
    resolved: '',
    search: '',
    startDate: undefined,
    endDate: undefined,
  });
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const loadLogs = () => {
    const allLogs = getErrorLogs();
    setLogs(allLogs);
  };

  const applyFilters = () => {
    const filteredLogs = filterErrorLogs({
      severity: filters.severity ? filters.severity as any : undefined,
      resolved: filters.resolved === 'true' ? true : filters.resolved === 'false' ? false : undefined,
      startDate: filters.startDate,
      endDate: filters.endDate,
      search: filters.search,
    });
    setLogs(filteredLogs);
  };

  const resetFilters = () => {
    setFilters({
      severity: '',
      resolved: '',
      search: '',
      startDate: undefined,
      endDate: undefined,
    });
    loadLogs();
  };

  const handleResolve = (id: string) => {
    resolveErrorLog(id);
    loadLogs();
    if (selectedLog && selectedLog.id === id) {
      const updatedLog = { ...selectedLog, resolved: true };
      setSelectedLog(updatedLog);
    }
  };

  const handleDelete = (id: string) => {
    deleteErrorLog(id);
    loadLogs();
    if (selectedLog && selectedLog.id === id) {
      setIsDetailOpen(false);
      setSelectedLog(null);
    }
  };

  const handleClearAll = () => {
    clearAllErrorLogs();
    loadLogs();
    setIsDetailOpen(false);
    setSelectedLog(null);
  };

  const handleRefresh = () => {
    loadLogs();
  };

  const viewLogDetails = (log: ErrorLog) => {
    setSelectedLog(log);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return {
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
  };
};
