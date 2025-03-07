
import { User } from '../types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    department: 'IT',
    createdAt: new Date(2023, 0, 15),
    lastLogin: new Date(),
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'it',
    department: 'IT',
    createdAt: new Date(2023, 1, 20),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    department: 'Marketing',
    createdAt: new Date(2023, 2, 10),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'user',
    department: 'Finance',
    createdAt: new Date(2023, 3, 5),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: 'user-5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'user',
    department: 'HR',
    createdAt: new Date(2023, 4, 18),
    lastLogin: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};
