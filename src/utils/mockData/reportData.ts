
// Mock data for report charts

export const mockIncidentData = [
  { id: 'open', label: 'Open', value: 35, color: '#FF6384' },
  { id: 'in-progress', label: 'In Progress', value: 25, color: '#36A2EB' },
  { id: 'pending', label: 'Pending', value: 15, color: '#FFCE56' },
  { id: 'resolved', label: 'Resolved', value: 10, color: '#4BC0C0' },
  { id: 'closed', label: 'Closed', value: 15, color: '#9966FF' },
];

export const mockIncidentTableData = [
  { id: 'INC001', title: 'Server down', status: 'open', priority: 'P1', assignee: 'John Doe', createdAt: '2023-06-01' },
  { id: 'INC002', title: 'Email not working', status: 'in-progress', priority: 'P2', assignee: 'Jane Smith', createdAt: '2023-06-02' },
  { id: 'INC003', title: 'Network slow', status: 'pending', priority: 'P3', assignee: 'Bob Johnson', createdAt: '2023-06-03' },
  { id: 'INC004', title: 'Application crash', status: 'resolved', priority: 'P1', assignee: 'Alice Brown', createdAt: '2023-06-04' },
  { id: 'INC005', title: 'Printer not working', status: 'closed', priority: 'P4', assignee: 'Charlie Davis', createdAt: '2023-06-05' },
];

export const mockServiceRequestData = [
  { id: 'pending', label: 'Pending', value: 30, color: '#FF6384' },
  { id: 'in-progress', label: 'In Progress', value: 40, color: '#36A2EB' },
  { id: 'closed', label: 'Closed', value: 30, color: '#4BC0C0' },
];

// Add mock service request table data to fix the import error
export const mockServiceRequestTableData = [
  { id: 'SR001', title: 'New laptop request', status: 'pending', priority: 'P3', assignee: 'John Doe', createdAt: '2023-06-01' },
  { id: 'SR002', title: 'Software installation', status: 'in-progress', priority: 'P3', assignee: 'Jane Smith', createdAt: '2023-06-02' },
  { id: 'SR003', title: 'Access request', status: 'pending', priority: 'P2', assignee: 'Bob Johnson', createdAt: '2023-06-03' },
  { id: 'SR004', title: 'Password reset', status: 'closed', priority: 'P4', assignee: 'Alice Brown', createdAt: '2023-06-04' },
  { id: 'SR005', title: 'Email configuration', status: 'in-progress', priority: 'P3', assignee: 'Charlie Davis', createdAt: '2023-06-05' },
];

export const mockProblemData = [
  { id: 'open', label: 'Open', value: 15, color: '#FF6384' },
  { id: 'under-investigation', label: 'Under Investigation', value: 35, color: '#36A2EB' },
  { id: 'resolved', label: 'Resolved', value: 20, color: '#FFCE56' },
  { id: 'closed', label: 'Closed', value: 30, color: '#4BC0C0' },
];

export const mockChangeData = [
  { id: 'c', label: 'Draft', value: 10, color: '#FF6384' },
  { id: 'c', label: 'Submitted', value: 15, color: '#36A2EB' },
  { id: 'c', label: 'Approved', value: 25, color: '#FFCE56' },
  { id: 'c', label: 'In Progress', value: 20, color: '#4BC0C0' },
  { id: 'c', label: 'Completed', value: 30, color: '#9966FF' },
];

export const mockReleaseData = [
  { id: 'r', label: 'Planned', value: 25, color: '#FF6384' },
  { id: 'r', label: 'In Progress', value: 35, color: '#36A2EB' },
  { id: 'r', label: 'Deployed', value: 40, color: '#4BC0C0' },
];

export const mockAssetData = [
  { id: 'a', label: 'Active', value: 65, color: '#36A2EB' },
  { id: 'a', label: 'Maintenance', value: 15, color: '#FFCE56' },
  { id: 'a', label: 'Retired', value: 20, color: '#FF6384' },
];

export const mockBugData = [
  { id: 'b', label: 'New', value: 30, color: '#FF6384' },
  { id: 'b', label: 'In Progress', value: 40, color: '#36A2EB' },
  { id: 'b', label: 'Fixed', value: 30, color: '#4BC0C0' },
];
