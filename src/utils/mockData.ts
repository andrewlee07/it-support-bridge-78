import { 
  User, 
  Ticket, 
  TicketType, 
  TicketStatus, 
  TicketPriority, 
  TicketCategory, 
  AuditEntry,
  Asset,
  AssetType,
  AssetStatus,
  SLA,
  ChangeRequest,
  ChangeStatus,
  RiskLevel,
  RiskAssessmentQuestion,
  EmailTemplate,
  ApiResponse,
  PaginatedResponse
} from './types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    department: 'IT',
    createdAt: new Date(2023, 0, 15),
    lastLogin: new Date(),
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'it',
    department: 'IT',
    createdAt: new Date(2023, 1, 20),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    department: 'Marketing',
    createdAt: new Date(2023, 2, 10),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'user',
    department: 'Finance',
    createdAt: new Date(2023, 3, 5),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: 'user-5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'user',
    department: 'HR',
    createdAt: new Date(2023, 4, 18),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
];

// Mock audit trail entries
const createAuditEntries = (entityId: string, entityType: 'ticket' | 'asset' | 'user' | 'change', createdBy: string): AuditEntry[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  return [
    {
      id: `audit-${entityId}-1`,
      entityId,
      entityType,
      message: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} created`,
      performedBy: createdBy,
      timestamp: yesterday,
    },
    {
      id: `audit-${entityId}-2`,
      entityId,
      entityType,
      message: 'Status changed to in-progress',
      performedBy: 'user-2',
      timestamp: new Date(yesterday.getTime() + 3600000), // 1 hour later
    },
  ];
};

// Mock tickets
export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    title: 'Laptop not starting',
    description: 'My laptop won\'t power on. I\'ve tried charging it and holding the power button.',
    status: 'in-progress',
    priority: 'high',
    category: 'hardware',
    type: 'incident',
    createdBy: 'user-3',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(),
    audit: createAuditEntries('ticket-1', 'ticket', 'user-3'),
  },
  {
    id: 'ticket-2',
    title: 'Need access to marketing drive',
    description: 'I need access to the marketing shared drive for the new campaign.',
    status: 'open',
    priority: 'medium',
    category: 'access',
    type: 'service',
    createdBy: 'user-4',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    audit: createAuditEntries('ticket-2', 'ticket', 'user-4'),
  },
  {
    id: 'ticket-3',
    title: 'Email not syncing on mobile',
    description: 'I can\'t get my email to sync on my company mobile phone.',
    status: 'resolved',
    priority: 'medium',
    category: 'software',
    type: 'incident',
    createdBy: 'user-5',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    resolvedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('ticket-3', 'ticket', 'user-5'),
  },
  {
    id: 'ticket-4',
    title: 'Request for new monitor',
    description: 'I would like to request a second monitor for my workstation.',
    status: 'open',
    priority: 'low',
    category: 'hardware',
    type: 'service',
    createdBy: 'user-3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('ticket-4', 'ticket', 'user-3'),
  },
  {
    id: 'ticket-5',
    title: 'Can\'t connect to VPN',
    description: 'I\'m unable to connect to the company VPN from home.',
    status: 'open',
    priority: 'high',
    category: 'network',
    type: 'incident',
    createdBy: 'user-4',
    createdAt: new Date(),
    updatedAt: new Date(),
    audit: createAuditEntries('ticket-5', 'ticket', 'user-4'),
  },
  {
    id: 'ticket-6',
    title: 'Software installation request',
    description: 'I need Adobe Photoshop installed on my computer.',
    status: 'in-progress',
    priority: 'medium',
    category: 'software',
    type: 'service',
    createdBy: 'user-5',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('ticket-6', 'ticket', 'user-5'),
  },
];

// Mock SLAs
export const mockSLAs: SLA[] = [
  {
    id: 'sla-1',
    name: 'High Priority SLA',
    description: 'Service Level Agreement for high priority tickets',
    priorityLevel: 'high',
    responseTimeHours: 1,
    resolutionTimeHours: 4,
    isActive: true,
  },
  {
    id: 'sla-2',
    name: 'Medium Priority SLA',
    description: 'Service Level Agreement for medium priority tickets',
    priorityLevel: 'medium',
    responseTimeHours: 4,
    resolutionTimeHours: 8,
    isActive: true,
  },
  {
    id: 'sla-3',
    name: 'Low Priority SLA',
    description: 'Service Level Agreement for low priority tickets',
    priorityLevel: 'low',
    responseTimeHours: 8,
    resolutionTimeHours: 24,
    isActive: true,
  },
];

// Mock risk assessment questions
export const mockRiskAssessmentQuestions: RiskAssessmentQuestion[] = [
  {
    id: 'question-1',
    question: 'Has pre-implementation testing been performed?',
    weight: 0.4,
    answers: [
      { id: 'q1-a1', text: 'No - Tests have not been performed', value: 5 },
      { id: 'q1-a2', text: 'Tests in progress', value: 4 },
      { id: 'q1-a3', text: 'Yes - With issues', value: 2 },
      { id: 'q1-a4', text: 'Yes - With success', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-2',
    question: 'Is the change planned during business hours?',
    weight: 0.4,
    answers: [
      { id: 'q2-a1', text: 'Yes', value: 5 },
      { id: 'q2-a2', text: 'No', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-3',
    question: 'What is the scope of the change?',
    weight: 0.6,
    answers: [
      { id: 'q3-a1', text: 'Organization-wide', value: 5 },
      { id: 'q3-a2', text: 'Multiple departments', value: 4 },
      { id: 'q3-a3', text: 'Single department', value: 3 },
      { id: 'q3-a4', text: 'Small group', value: 2 },
      { id: 'q3-a5', text: 'Individual user', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-4',
    question: 'Is there a rollback plan in place?',
    weight: 0.5,
    answers: [
      { id: 'q4-a1', text: 'No rollback plan', value: 5 },
      { id: 'q4-a2', text: 'Partial rollback possible', value: 3 },
      { id: 'q4-a3', text: 'Complete rollback plan prepared', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
];

// Mock change requests
export const mockChangeRequests: ChangeRequest[] = [
  {
    id: 'change-1',
    title: 'Network Router Upgrade',
    description: 'Upgrade all office routers to new firmware version.',
    status: 'approved',
    priority: 'medium',
    category: 'network',
    type: 'change',
    createdBy: 'user-2',
    assignedTo: 'user-1',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    riskScore: 2.2,
    riskLevel: 'medium',
    assessmentAnswers: [
      { questionId: 'question-1', selectedOptionId: 'q1-a4', value: 1 },
      { questionId: 'question-2', selectedOptionId: 'q2-a2', value: 1 },
      { questionId: 'question-3', selectedOptionId: 'q3-a1', value: 5 },
      { questionId: 'question-4', selectedOptionId: 'q4-a3', value: 1 }
    ],
    implementationPlan: 'Upgrade routers after business hours with network team on standby.',
    rollbackPlan: 'Restore from firmware backup if issues arise.',
    approvedBy: 'user-1',
    approvedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    audit: createAuditEntries('change-1', 'change', 'user-2'),
  },
  {
    id: 'change-2',
    title: 'Email Server Migration',
    description: 'Migrate email server to new cloud infrastructure.',
    status: 'submitted',
    priority: 'high',
    category: 'software',
    type: 'change',
    createdBy: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    startDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
    riskScore: 3.8,
    riskLevel: 'high',
    assessmentAnswers: [
      { questionId: 'question-1', selectedOptionId: 'q1-a3', value: 2 },
      { questionId: 'question-2', selectedOptionId: 'q2-a1', value: 5 },
      { questionId: 'question-3', selectedOptionId: 'q3-a1', value: 5 },
      { questionId: 'question-4', selectedOptionId: 'q4-a2', value: 3 }
    ],
    implementationPlan: 'Phase migration over weekend with IT team monitoring.',
    rollbackPlan: 'Revert to old server if not completed successfully.',
    audit: createAuditEntries('change-2', 'change', 'user-2'),
  },
  {
    id: 'change-3',
    title: 'Windows Update Deployment',
    description: 'Deploy latest Windows security updates to all workstations.',
    status: 'completed',
    priority: 'medium',
    category: 'software',
    type: 'change',
    createdBy: 'user-2',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    endDate: new Date(new Date().setDate(new Date().getDate() - 4)),
    riskScore: 1.6,
    riskLevel: 'low',
    assessmentAnswers: [
      { questionId: 'question-1', selectedOptionId: 'q1-a4', value: 1 },
      { questionId: 'question-2', selectedOptionId: 'q2-a2', value: 1 },
      { questionId: 'question-3', selectedOptionId: 'q3-a2', value: 4 },
      { questionId: 'question-4', selectedOptionId: 'q4-a3', value: 1 }
    ],
    implementationPlan: 'Push updates via WSUS after hours.',
    rollbackPlan: 'Use system restore points if issues occur.',
    approvedBy: 'user-1',
    approvedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    audit: createAuditEntries('change-3', 'change', 'user-2'),
  }
];

// Mock assets
export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Dell XPS 15',
    type: 'hardware',
    status: 'in-use',
    assignedTo: 'user-3',
    purchaseDate: new Date(2023, 0, 15),
    manufacturer: 'Dell',
    model: 'XPS 15 9510',
    serialNumber: 'DELL1234567',
    location: 'Main Office',
    notes: 'Executive laptop',
    createdAt: new Date(2023, 0, 16),
    updatedAt: new Date(2023, 0, 16),
    audit: createAuditEntries('asset-1', 'asset', 'user-1'),
  },
  {
    id: 'asset-2',
    name: 'Microsoft Office 365',
    type: 'software',
    status: 'in-use',
    purchaseDate: new Date(2023, 0, 1),
    expiryDate: new Date(2024, 0, 1),
    manufacturer: 'Microsoft',
    notes: 'Company-wide license',
    createdAt: new Date(2023, 0, 3),
    updatedAt: new Date(2023, 0, 3),
    audit: createAuditEntries('asset-2', 'asset', 'user-1'),
  },
  {
    id: 'asset-3',
    name: 'iPhone 13',
    type: 'hardware',
    status: 'in-use',
    assignedTo: 'user-1',
    purchaseDate: new Date(2023, 2, 10),
    manufacturer: 'Apple',
    model: 'iPhone 13 Pro',
    serialNumber: 'APPLE9876543',
    location: 'Main Office',
    createdAt: new Date(2023, 2, 11),
    updatedAt: new Date(2023, 2, 11),
    audit: createAuditEntries('asset-3', 'asset', 'user-2'),
  },
  {
    id: 'asset-4',
    name: 'Adobe Creative Cloud',
    type: 'license',
    status: 'in-use',
    assignedTo: 'user-4',
    purchaseDate: new Date(2023, 1, 15),
    expiryDate: new Date(2024, 1, 15),
    manufacturer: 'Adobe',
    createdAt: new Date(2023, 1, 16),
    updatedAt: new Date(2023, 1, 16),
    audit: createAuditEntries('asset-4', 'asset', 'user-1'),
  },
  {
    id: 'asset-5',
    name: 'HP LaserJet Printer',
    type: 'hardware',
    status: 'in-use',
    purchaseDate: new Date(2022, 11, 5),
    manufacturer: 'HP',
    model: 'LaserJet Pro MFP M428fdw',
    serialNumber: 'HP87654321',
    location: 'Marketing Department',
    createdAt: new Date(2022, 11, 6),
    updatedAt: new Date(2022, 11, 6),
    audit: createAuditEntries('asset-5', 'asset', 'user-2'),
  },
];

// Mock email templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'email-1',
    name: 'Ticket Created',
    subject: 'Your ticket #{ticketId} has been created',
    body: 'Hello {userName},\n\nYour ticket "{ticketTitle}" has been created successfully. We will address it as soon as possible.\n\nThank you for your patience.\n\nIT Support Team',
    triggerOn: 'ticket-created',
    isActive: true,
  },
  {
    id: 'email-2',
    name: 'Ticket Assigned',
    subject: 'Ticket #{ticketId} has been assigned',
    body: 'Hello {agentName},\n\nTicket "{ticketTitle}" has been assigned to you. Please review and take appropriate action.\n\nThank you,\nIT Support Team',
    triggerOn: 'ticket-assigned',
    isActive: true,
  },
  {
    id: 'email-3',
    name: 'SLA Breach Alert',
    subject: 'ALERT: SLA Breach for Ticket #{ticketId}',
    body: 'Hello {managerName},\n\nThe SLA for ticket "{ticketTitle}" has been breached. This {ticketPriority} priority ticket has not been resolved within the defined timeframe.\n\nPlease take immediate action.\n\nIT Support Team',
    triggerOn: 'sla-breach',
    isActive: true,
  },
];

// Helper function to filter tickets
export const getTicketsByType = (type: TicketType): Ticket[] => {
  return mockTickets.filter(ticket => ticket.type === type);
};

// Helper function to filter tickets by status
export const getTicketsByStatus = (status: TicketStatus): Ticket[] => {
  return mockTickets.filter(ticket => ticket.status === status);
};

// Helper function to filter tickets by priority
export const getTicketsByPriority = (priority: TicketPriority): Ticket[] => {
  return mockTickets.filter(ticket => ticket.priority === priority);
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get ticket by ID
export const getTicketById = (id: string): Ticket | undefined => {
  return mockTickets.find(ticket => ticket.id === id);
};

// Helper function to get asset by ID
export const getAssetById = (id: string): Asset | undefined => {
  return mockAssets.find(asset => asset.id === id);
};

// Helper function to get change request by ID
export const getChangeRequestById = (id: string): ChangeRequest | undefined => {
  return mockChangeRequests.find(change => change.id === id);
};

// Helper function to calculate risk level based on score
export const calculateRiskLevel = (score: number): RiskLevel => {
  if (score < 2) return 'low';
  if (score < 4) return 'medium';
  return 'high';
};

// Dashboard stats
export const getDashboardStats = () => {
  const openIncidents = mockTickets.filter(
    ticket => ticket.type === 'incident' && ticket.status === 'open'
  ).length;
  
  const inProgressIncidents = mockTickets.filter(
    ticket => ticket.type === 'incident' && ticket.status === 'in-progress'
  ).length;
  
  const openServiceRequests = mockTickets.filter(
    ticket => ticket.type === 'service' && ticket.status === 'open'
  ).length;
  
  const inProgressServiceRequests = mockTickets.filter(
    ticket => ticket.type === 'service' && ticket.status === 'in-progress'
  ).length;
  
  const pendingChangeRequests = mockChangeRequests.filter(
    change => change.status === 'submitted'
  ).length;
  
  const upcomingChanges = mockChangeRequests.filter(
    change => change.status === 'approved' && new Date(change.startDate) > new Date()
  ).length;
  
  // Mock SLA compliance calculation - in a real app, this would be more complex
  const slaCompliance = 85;
  
  const recentTickets = [...mockTickets].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  // Create ticket distribution by category
  const categories = [...new Set(mockTickets.map(ticket => ticket.category))];
  const ticketsByCategory = categories.map(category => ({
    category,
    count: mockTickets.filter(ticket => ticket.category === category).length
  }));
  
  // Create ticket distribution by priority
  const priorities = [...new Set(mockTickets.map(ticket => ticket.priority))];
  const ticketsByPriority = priorities.map(priority => ({
    priority,
    count: mockTickets.filter(ticket => ticket.priority === priority).length
  }));
  
  return {
    openIncidents,
    inProgressIncidents,
    openServiceRequests,
    inProgressServiceRequests,
    pendingChangeRequests,
    upcomingChanges,
    slaCompliance,
    recentTickets,
    ticketsByCategory,
    ticketsByPriority
  };
};

// Simulate API responses
export const simulateApiResponse = <T>(data: T, delay: number = 500): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
        message: 'Operation successful'
      });
    }, delay);
  });
};

// Simulate paginated API responses
export const simulatePaginatedResponse = <T>(
  items: T[],
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedItems = items.slice(startIndex, endIndex);
      const total = items.length;
      
      resolve({
        items: paginatedItems,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    }, 500);
  });
};
