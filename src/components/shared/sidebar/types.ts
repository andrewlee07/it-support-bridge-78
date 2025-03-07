
import { UserRole } from '@/utils/types';

export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  allowedRoles: UserRole[];
}
