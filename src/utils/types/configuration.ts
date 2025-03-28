
export interface ModuleConfiguration {
  id: string;
  moduleName: string;
  configKey: string;
  configValue: string;
  configDisplayName: string;
  description: string;
  dataType: 'string' | 'number' | 'boolean' | 'json';
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  isEnabled: boolean;
  isSystem: boolean;
  validationRegex?: string;
  allowedValues?: string[];
}
