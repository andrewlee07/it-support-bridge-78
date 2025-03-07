
// Asset types
import { AuditEntry } from './audit';

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
