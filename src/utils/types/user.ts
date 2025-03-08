
// User types
export type UserRole = 'admin' | 'manager' | 'agent' | 'developer' | 'it' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  title?: string;
  active?: boolean;
  lastActive?: Date;
  createdAt?: Date;
  lastLogin?: Date;
}
