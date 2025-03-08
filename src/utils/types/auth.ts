
import { User, UserRole } from './user';

// Auth context types
export interface AuthContextType {
  user: User | null;
  pendingUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
  verifyMFA: (code: string) => Promise<boolean>;
  resendMFACode: () => Promise<boolean>;
  cancelMFA: () => void;
  checkSessionValidity: () => boolean;
  refreshSession: () => boolean;
  userHasPermission: (permissionName: string) => boolean;
  userCanPerformAction: (resource: string, action: string) => boolean;
}
