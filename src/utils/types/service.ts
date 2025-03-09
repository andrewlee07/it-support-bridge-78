
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
