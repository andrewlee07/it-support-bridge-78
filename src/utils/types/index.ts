
// API Response Type
export interface ApiError {
  message: string;
  code: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
}

// Define PaginatedResponse for consistent usage
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Announcement types
export type AnnouncementStatus = 'active' | 'draft' | 'expired';
export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'critical';
export type AnnouncementType = 'outage' | 'maintenance' | 'information' | 'other';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  status: AnnouncementStatus;
  priority: AnnouncementPriority;
  type: AnnouncementType;
  createdBy: string;
  creatorName: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  expiresAt?: Date | string;
  relatedIncidentId?: string;
  audienceGroups?: string[];
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  title?: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export type UserRole = 'admin' | 'manager' | 'user' | 'technician';

// Risk assessment types
export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskThreshold {
  id: string;
  level: RiskLevel;
  minScore: number;
  maxScore: number;
}

export interface RiskAssessmentQuestionOption {
  id: string;
  text: string;
  value: number;
}

export interface RiskAssessmentQuestion {
  id: string;
  question: string;
  description?: string;
  weight: number;
  active: boolean;
  answers: RiskAssessmentQuestionOption[];
}

export interface RiskAssessmentAnswer {
  questionId: string;
  selectedOptionId: string;
  value: number;
}

// Change management types
export type ChangeStatus = 'draft' | 'pending' | 'approved' | 'implementing' | 'implemented' | 'failed' | 'cancelled' | 'rejected';
export type ChangeCategory = 'standard' | 'normal' | 'emergency';
export type ClosureReason = 'successful' | 'successful-with-issues' | 'rolled-back' | 'failed';
export type ApproverRole = 'it' | 'user' | 'change-manager';

export interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  status: ChangeStatus;
  priority: string;
  category: ChangeCategory;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  implementationPlan: string;
  rollbackPlan: string;
  approverRoles?: ApproverRole[];
  approvers?: string[];
  approvalStatus?: Record<string, boolean>;
  closureReason?: ClosureReason;
  closureNotes?: string;
  assessmentScore?: number;
  assessmentRiskLevel?: RiskLevel;
  assessmentAnswers?: RiskAssessmentAnswer[];
  relatedItemIds?: string[];
}

// Dropdown configuration types
export type ConfigurableEntityType = 'ticket' | 'asset' | 'change' | 'bug' | 'user' | 'service';

export interface DropdownOption {
  id: string;
  value: string;
  label: string;
  color?: string;
  isDefault?: boolean;
  order: number;
  isDisabled?: boolean;
}

export interface ConfigurableDropdown {
  id: string;
  entityType: ConfigurableEntityType;
  fieldName: string;
  displayName: string;
  description?: string;
  isRequired: boolean;
  isMulti: boolean;
  isSortable: boolean;
  options: DropdownOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DropdownConfigFormProps {
  entityType: ConfigurableEntityType;
  configId?: string | null;
  onClose: () => void;
  isNew?: boolean;
}

// SLA types
export interface SLA {
  id: string;
  name: string;
  description: string;
  priority: string;
  responseTime: number;
  resolutionTime: number;
  businessHoursOnly: boolean;
  active: boolean;
}

// Module configuration types
export interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: Date;
  ipAddress?: string;
  changedFields?: Record<string, { oldValue: any; newValue: any }>;
}

// Add all exports from other type files for convenience
export * from './ticket';
export * from './problem';
export * from './backlogTypes';
export * from './release';
export * from './taskTypes';
export * from './test';
export * from './service';
export * from './asset';
