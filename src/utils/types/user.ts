
// User types
export type UserRole = 'admin' | 'it' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  createdAt: Date;
  lastLogin?: Date;
}
