
export type ServiceStatus = 'active' | 'inactive';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  displayOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  status: ServiceStatus;
  // New Phase 2A fields
  supportContactId?: string;     // Person responsible for support
  supportTeamId?: string;        // Team responsible for support
  supportHours?: string;         // E.g., "Business Hours", "24/7"
  serviceOwnerId?: string;       // Person accountable for the service
  documentationUrl?: string;     // Link to detailed documentation
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

export interface ServiceTicketCount {
  serviceId: string;
  serviceName: string;
  incidents: number;
  requests: number;
  total: number;
}

// Support hours constants
export const SERVICE_SUPPORT_HOURS = [
  "Business Hours (9am-5pm)",
  "Extended Hours (8am-8pm)",
  "24/7 Support",
  "Limited Support",
  "On-demand Support"
] as const;

export type SupportHours = typeof SERVICE_SUPPORT_HOURS[number];
