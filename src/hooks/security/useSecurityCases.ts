import { useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { SecurityCase } from '@/utils/types/security';
import { DateRange } from 'react-day-picker';
import React from 'react';

// This is a mock implementation - in a real app, this would fetch from an API
const mockSecurityCases: SecurityCase[] = [
  {
    id: 'SEC00001',
    title: 'Customer Data Exposure',
    description: 'Inadvertent exposure of customer data through API misconfiguration',
    type: 'Data Breach',
    status: 'Active',
    priority: 'High',
    reportedBy: 'user-1',
    reportedAt: '2023-12-15T14:30:00',
    affectedSystems: ['Customer Portal', 'API Gateway'],
    investigationSteps: [
      { date: '2023-12-15', text: 'Initial discovery and containment' },
      { date: '2023-12-16', text: 'Impact assessment conducted' }
    ],
    impactedUsers: 120,
    remediationPlan: 'Update API gateway security configurations and implement additional access controls',
    firstResponseAt: '2023-12-15T15:45:00'
  },
  {
    id: 'SEC00002',
    title: 'GDPR Subject Access Request',
    description: 'Customer requesting all personal data held by company',
    type: 'SAR',
    status: 'Pending',
    priority: 'Medium',
    reportedBy: 'user-2',
    reportedAt: '2023-12-10T09:15:00',
    affectedSystems: ['CRM', 'Customer Database'],
    investigationSteps: [
      { date: '2023-12-10', text: 'Request received and logged' },
      { date: '2023-12-12', text: 'Initial data gathering process started' }
    ],
    impactedUsers: 1,
    remediationPlan: 'Compile all customer data and prepare secure transfer mechanism',
    firstResponseAt: '2023-12-10T10:30:00'
  },
  {
    id: 'SEC00003',
    title: 'Password Policy Non-Compliance',
    description: 'Legacy systems not enforcing new password complexity requirements',
    type: 'Compliance',
    status: 'Active',
    priority: 'Medium',
    reportedBy: 'user-3',
    reportedAt: '2023-12-01T11:45:00',
    affectedSystems: ['Legacy HR System', 'Vendor Portal'],
    investigationSteps: [
      { date: '2023-12-01', text: 'Non-compliance identified during routine audit' },
      { date: '2023-12-03', text: 'Technical assessment of affected systems' }
    ],
    impactedUsers: 50,
    remediationPlan: 'Update password policies on legacy systems or implement compensating controls'
  },
  {
    id: 'SEC00004',
    title: 'Phishing Attempt',
    description: 'Targeted phishing campaign against finance department',
    type: 'Threat',
    status: 'Resolved',
    priority: 'Low',
    reportedBy: 'user-1',
    reportedAt: '2023-11-20T08:30:00',
    affectedSystems: ['Email System'],
    investigationSteps: [
      { date: '2023-11-20', text: 'Phishing emails identified and reported' },
      { date: '2023-11-20', text: 'Email security rules updated' },
      { date: '2023-11-21', text: 'Security awareness communication sent to all staff' }
    ],
    impactedUsers: 15,
    remediationPlan: 'Completed: Enhanced email filtering and security awareness training',
    firstResponseAt: '2023-11-20T09:15:00',
    resolvedAt: '2023-11-22T14:00:00'
  }
];

export const useSecurityCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [cardFilters, setCardFilters] = useState<{
    activeCases: boolean;
    dataBreaches: boolean;
    complianceIssues: boolean;
  }>({
    activeCases: false,
    dataBreaches: false,
    complianceIssues: false
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<SecurityCase | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Calculate SLA information for a security case
  const calculateSLAStatus = (securityCase: SecurityCase, slaType: 'response' | 'resolution' = 'resolution') => {
    // For resolved cases
    if (securityCase.status === 'Resolved') {
      return {
        percentLeft: 100,
        timeLeft: 'Completed',
        isBreached: false,
        breachTime: 0
      };
    }
    
    // Get SLA target times based on priority and type
    const getSLATargetHours = (priority: string, type: 'response' | 'resolution'): number => {
      const targets = {
        response: {
          High: 1,
          Medium: 4,
          Low: 8
        },
        resolution: {
          High: 24,
          Medium: 48,
          Low: 72
        }
      };
      
      return targets[type][priority as keyof typeof targets[typeof type]] || 
             (type === 'response' ? 4 : 48); // Default fallback
    };
    
    const reportedAt = new Date(securityCase.reportedAt);
    const targetHours = getSLATargetHours(securityCase.priority, slaType);
    const slaTarget = new Date(reportedAt.getTime() + targetHours * 60 * 60 * 1000);
    
    // For response SLA, check if first response exists
    if (slaType === 'response' && securityCase.firstResponseAt) {
      const responseAt = new Date(securityCase.firstResponseAt);
      const isBreached = responseAt > slaTarget;
      
      return {
        percentLeft: 100,
        timeLeft: 'Responded',
        isBreached,
        breachTime: isBreached ? responseAt.getTime() - slaTarget.getTime() : 0
      };
    }
    
    // Calculate time remaining
    const now = new Date();
    const isBreached = now > slaTarget;
    
    // Calculate percentage of time left
    const totalDuration = slaTarget.getTime() - reportedAt.getTime();
    const elapsedDuration = now.getTime() - reportedAt.getTime();
    const percentUsed = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    const percentLeft = Math.max(0, 100 - percentUsed);
    
    return {
      percentLeft,
      timeLeft: isBreached ? 'Breached' : 'On Track',
      isBreached,
      breachTime: isBreached ? now.getTime() - slaTarget.getTime() : 0
    };
  };
  
  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle card filter toggle
  const toggleCardFilter = (filterName: keyof typeof cardFilters) => {
    setCardFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  // Format time difference for display
  const getTimeDifference = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return formatDate(dateString);
  };

  // Handle row expansion
  const toggleExpandRow = (caseId: string) => {
    if (expandedCase === caseId) {
      setExpandedCase(null);
    } else {
      setExpandedCase(caseId);
      const caseDetail = mockSecurityCases.find(c => c.id === caseId);
      setSelectedCase(caseDetail || null);
    }
  };

  // Handle case view
  const handleViewCase = (secCase: SecurityCase) => {
    setSelectedCase(secCase);
    setViewDialogOpen(true);
  };

  // Handle case edit
  const handleEditCase = (secCase: SecurityCase) => {
    toast.info(`Editing case ${secCase.id}`, {
      description: "Edit functionality would open edit form"
    });
  };

  // Export to CSV
  const exportToCsv = () => {
    const filteredCases = getFilteredCases();
    const headers = ['ID', 'Title', 'Type', 'Status', 'Priority', 'Reported By', 'Reported At'];
    
    const csvContent = [
      headers.join(','),
      ...filteredCases.map(c => [
        c.id,
        `"${c.title.replace(/"/g, '""')}"`,
        c.type,
        c.status,
        c.priority,
        'User Name', // Replace with getUserNameById(c.reportedBy) in real implementation
        formatDate(c.reportedAt)
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `security_cases_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Export complete', {
      description: 'Security cases exported to CSV'
    });
  };

  // Export to PDF
  const exportToPdf = () => {
    toast.info('PDF Export', {
      description: 'PDF export functionality would generate a formatted report'
    });
  };

  // Get filtered cases
  const getFilteredCases = () => {
    let filtered = [...mockSecurityCases];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        case_ => 
          case_.id.toLowerCase().includes(query) ||
          case_.title.toLowerCase().includes(query) ||
          case_.description.toLowerCase().includes(query)
      );
    }
    
    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(case_ => case_.priority === priorityFilter);
    }
    
    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter(case_ => case_.type === typeFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(case_ => case_.status === statusFilter);
    }
    
    // Apply card filters
    if (cardFilters.activeCases) {
      filtered = filtered.filter(case_ => case_.status === 'Active');
    }
    
    if (cardFilters.dataBreaches) {
      filtered = filtered.filter(case_ => case_.type === 'Data Breach');
    }
    
    if (cardFilters.complianceIssues) {
      filtered = filtered.filter(case_ => case_.type === 'Compliance');
    }
    
    // Apply date range filter
    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(case_ => {
        const caseDate = new Date(case_.reportedAt);
        return caseDate >= fromDate;
      });
    }
    
    if (dateRange?.to) {
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      
      filtered = filtered.filter(case_ => {
        const caseDate = new Date(case_.reportedAt);
        return caseDate <= toDate;
      });
    }
    
    // Apply sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        let valueA: any;
        let valueB: any;
        
        // Special handling for SLA column
        if (sortColumn === 'sla') {
          const slaA = calculateSLAStatus(a);
          const slaB = calculateSLAStatus(b);
          
          // Sort by breach status first, then by percent left
          if (slaA.isBreached !== slaB.isBreached) {
            return slaA.isBreached ? (sortDirection === 'asc' ? 1 : -1) : (sortDirection === 'asc' ? -1 : 1);
          }
          
          valueA = slaA.percentLeft;
          valueB = slaB.percentLeft;
        } else {
          valueA = a[sortColumn as keyof SecurityCase];
          valueB = b[sortColumn as keyof SecurityCase];
          
          // Special handling for date fields
          if (sortColumn === 'reportedAt' || sortColumn === 'firstResponseAt' || sortColumn === 'resolvedAt') {
            valueA = new Date(valueA || 0).getTime();
            valueB = new Date(valueB || 0).getTime();
          }
          
          // Handle string comparisons (case-insensitive)
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
          }
        }
        
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  };

  // Get styling for different types, statuses, priorities
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Data Breach': return 'bg-red-50 text-red-700 border-red-200';
      case 'SAR': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Compliance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Threat': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Resolved': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Get priority icon based on level
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return React.createElement('div', { className: "w-3 h-3 rounded-full bg-red-500 mr-2" });
      case 'Medium':
        return React.createElement('div', { className: "w-3 h-3 rounded-full bg-yellow-500 mr-2" });
      case 'Low':
        return React.createElement('div', { className: "w-3 h-3 rounded-full bg-green-500 mr-2" });
      default:
        return null;
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriorityFilter(null);
    setTypeFilter(null);
    setStatusFilter(null);
    setSortColumn(null);
    setDateRange({ from: undefined, to: undefined });
    setCardFilters({
      activeCases: false,
      dataBreaches: false,
      complianceIssues: false
    });
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return searchQuery !== '' || 
           priorityFilter !== null || 
           typeFilter !== null || 
           statusFilter !== null ||
           dateRange?.from !== undefined ||
           dateRange?.to !== undefined ||
           cardFilters.activeCases ||
           cardFilters.dataBreaches ||
           cardFilters.complianceIssues;
  };

  // Handle Export Actions
  const handleExport = (type: 'csv' | 'pdf') => {
    if (type === 'csv') {
      exportToCsv();
    } else {
      exportToPdf();
    }
  };

  // Filter options and counts for metric cards
  const typeOptions = ['Data Breach', 'SAR', 'Compliance', 'Threat'];
  const priorityOptions = ['High', 'Medium', 'Low'];
  const statusOptions = ['Active', 'Pending', 'Resolved'];
  const activeCasesCount = mockSecurityCases.filter(c => c.status === 'Active').length;
  const dataBreachesCount = mockSecurityCases.filter(c => c.type === 'Data Breach').length;
  const complianceIssuesCount = mockSecurityCases.filter(c => c.type === 'Compliance').length;

  return {
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
    totalCases: mockSecurityCases.length,
    calculateSLAStatus,
  };
};
