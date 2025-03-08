
import { User } from '@/utils/types/user';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  sessionTimeout?: number;
  sessionStartTime?: Date;
};

export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  pendingUser: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshSession: () => boolean;
  hasPermission: (requiredRoles: string[]) => boolean;
  userCanPerformAction: (resource: string, action: string) => boolean;
  verifyMFA: (code: string) => Promise<boolean>;
  resendMFACode: () => Promise<boolean>;
  cancelMFA: () => void;
};
