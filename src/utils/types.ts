
// User types
export type UserRole = 'admin' | 'it' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Ticket types
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed' | 'approved' | 'fulfilled';
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';
export type TicketType = 'incident' | 'service' | 'change';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  type: TicketType;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  dueDate?: Date;
  slaBreachAt?: Date;
  audit: AuditEntry[];
}

// SLA definitions
export interface SLA {
  id: string;
  name: string;
  description: string;
  priorityLevel: TicketPriority;
  responseTimeHours: number;
  resolutionTimeHours: number;
  isActive: boolean;
}

// Change management types
export type ChangeStatus = 'draft' | 'submitted' | 'approved' | 'in-progress' | 'completed' | 'failed' | 'cancelled';
export type RiskLevel = 'low' | 'medium' | 'high';
export type ChangeCategory = 'standard' | 'normal' | 'emergency';
export type ClosureReason = 'successful' | 'successful-with-issues' | 'rolled-back' | 'failed';
export type ApproverRole = 'it' | 'user';

export interface ChangeRequest extends Omit<Ticket, 'status' | 'category'> {
  status: ChangeStatus;
  category: ChangeCategory;
  startDate: Date;
  endDate: Date;
  riskScore: number;
  riskLevel: RiskLevel;
  assessmentAnswers: RiskAssessmentAnswer[];
  implementationPlan: string;
  rollbackPlan: string;
  closureReason?: ClosureReason;
  approverRoles?: ApproverRole[];
  approvedBy?: string;
  approvedAt?: Date;
}

export interface RiskAssessmentQuestion {
  id: string;
  question: string;
  weight: number;
  answers: RiskAssessmentQuestionOption[];
  isRequired: boolean;
  active: boolean;
}

export interface RiskAssessmentQuestionOption {
  id: string;
  text: string;
  value: number;
}

export interface RiskAssessmentAnswer {
  questionId: string;
  selectedOptionId: string;
  value: number;
}

// New risk threshold configuration
export interface RiskThreshold {
  id: string;
  level: RiskLevel;
  minScore: number;
  maxScore: number;
}

// Asset types
export type AssetStatus = 'available' | 'in-use' | 'maintenance' | 'retired';
export type AssetType = 'hardware' | 'software' | 'license' | 'other';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  assignedTo?: string;
  purchaseDate?: Date;
  expiryDate?: Date;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  location?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  audit: AuditEntry[];
}

// Release management types
export type ReleaseStatus = 'Planned' | 'In Progress' | 'Deployed' | 'Cancelled';
export type ReleaseType = 'major' | 'minor' | 'patch' | 'emergency';

export interface Release {
  id: string;
  title: string;
  version: string;
  type: ReleaseType;
  description: string;
  plannedDate: Date;
  status: ReleaseStatus;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  items: ReleaseItem[];
  audit: AuditEntry[];
}

export interface ReleaseItem {
  id: string;
  releaseId: string;
  itemId: string;
  itemType: 'change' | 'incident' | 'asset';
  addedAt: Date;
  addedBy: string;
}

// Audit trail
export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: 'ticket' | 'asset' | 'user' | 'change' | 'release';
  message: string;
  performedBy: string;
  timestamp: Date;
}

// Email notification
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  triggerOn: 'ticket-created' | 'ticket-updated' | 'ticket-assigned' | 'ticket-resolved' | 'sla-breach' | 'change-approved' | 'change-submitted';
  isActive: boolean;
}

// Dashboard stats
export interface DashboardStats {
  openIncidents: number;
  inProgressIncidents: number;
  openServiceRequests: number;
  inProgressServiceRequests: number;
  pendingChangeRequests: number;
  upcomingChanges: number;
  slaCompliance: number;
  recentTickets: Ticket[];
  ticketsByCategory: {
    category: string;
    count: number;
  }[];
  ticketsByPriority: {
    priority: string;
    count: number;
  }[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and search
export interface TicketFilter {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: TicketCategory[];
  type?: TicketType[];
  assignedTo?: string;
  createdBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

// Configuration types for dropdown fields
export type ConfigurableEntityType = 'incident' | 'service-request' | 'change' | 'asset';

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ConfigurableDropdown {
  id: string;
  entityType: ConfigurableEntityType;
  fieldName: string;
  displayName: string;
  options: DropdownOption[];
  isRequired: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
