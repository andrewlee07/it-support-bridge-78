
export type ConfigurableEntityType = 
  'release' | 
  'ticket' | 
  'backlog' | 
  'incident' | 
  'change' | 
  'service-request' | 
  'problem' | 
  'asset' | 
  'bug' | 
  'user' | 
  'test';

export interface MandatoryFieldConfig {
  fieldName: string;
  displayName: string;
  isRequired: boolean;
  entityType: ConfigurableEntityType;
  description: string;
  isResolutionField?: boolean;
}

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  color?: string;
  isDefault?: boolean;
  order: number;
}

export interface ConfigurableDropdown {
  id: string;
  name: string;
  entity: ConfigurableEntityType;
  field: string;
  options: DropdownOption[];
}

export interface DropdownConfigFormProps {
  entityType: ConfigurableEntityType;
  fieldName: string;
  fieldLabel: string;
  options: DropdownOption[];
  onSave: (options: DropdownOption[]) => void;
  onCancel: () => void;
  isCreateMode?: boolean;
}

// SLA Type definition
export interface SLA {
  id: string;
  name: string;
  description: string;
  entityType: ConfigurableEntityType;
  priorityLevels: {
    [key: string]: {
      responseTime: number;
      responseTimeUnit: 'minutes' | 'hours' | 'days';
      resolutionTime: number;
      resolutionTimeUnit: 'minutes' | 'hours' | 'days';
    }
  };
  workingHours: {
    start: string;
    end: string;
    timezone: string;
    workDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  };
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Risk Assessment related types
export interface RiskAssessmentQuestionOption {
  id: string;
  text: string;
  value: number;
}

export interface RiskAssessmentQuestion {
  id: string;
  text: string;
  description?: string;
  options: RiskAssessmentQuestionOption[];
  category: string;
  weight: number;
  isRequired: boolean;
  order: number;
}

export interface RiskAssessmentAnswer {
  questionId: string;
  selectedOptionId: string;
  value: number;
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskThreshold {
  id: string;
  level: RiskLevel;
  minScore: number;
  maxScore: number;
}
