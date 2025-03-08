
// User types
export type UserRole = 'admin' | 'manager' | 'agent' | 'developer' | 'it' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  title?: string; // Make optional to accommodate both formats
  active?: boolean; // Make optional
  lastActive?: Date; // Make optional
  createdAt?: Date; // Make optional to accommodate existing mockUsers
  lastLogin?: Date;
}
