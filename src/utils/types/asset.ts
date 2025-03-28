
export interface Asset {
  id: string;
  name: string;
  description: string;
  status: AssetStatus;
  type: AssetType;
  category: string;
  purchaseDate: Date;
  expiryDate?: Date;
  cost: number;
  assignedTo?: string;
  location?: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  customFields?: Record<string, any>;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  maintenanceFrequency?: string;
  notes?: string;
}

export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'retired' | 'lost' | 'on-order';
export type AssetType = 'hardware' | 'software' | 'service' | 'furniture' | 'vehicle' | 'other';

export interface AssetMaintenance {
  id: string;
  assetId: string;
  maintenanceType: 'preventive' | 'corrective' | 'predictive' | 'condition-based';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  technician?: string;
  cost?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
