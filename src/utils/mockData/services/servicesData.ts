
import { ServiceWithCategory, Service, ServiceRelationship } from '@/utils/types/service';
import { serviceCategories } from './categories';
import { services } from './data/servicesList';
import { serviceRelationships } from './data/serviceRelationships';
import { 
  getAllServices,
  getServiceById, 
  getServicesByCategory,
  getRelatedServices,
  getChildServices,
  addService,
  updateService
} from './operations/serviceOperations';
import { 
  getServiceRelationships,
  createServiceRelationship 
} from './operations/relationshipOperations';

// Re-export everything for backwards compatibility
export {
  services,
  serviceRelationships,
  getAllServices,
  getServiceById,
  getServicesByCategory,
  getRelatedServices,
  getServiceRelationships,
  getChildServices,
  addService,
  updateService,
  createServiceRelationship
};
