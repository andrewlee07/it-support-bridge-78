
import { User, UserRole, MFAMethod } from '../types/user';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin' as UserRole,
    department: 'IT',
    title: 'System Administrator',
    active: true,
    lastActive: new Date('2023-05-10T12:30:00'),
    createdAt: new Date('2023-01-01T10:00:00'),
    mfaEnabled: true,
    mfaMethod: 'totp' as MFAMethod,
    securityQuestions: [
      { question: "What was your first pet's name?", answer: "Rover" },
      { question: "What is your mother's maiden name?", answer: "Smith" }
    ],
    loginAttempts: 0,
    passwordLastChanged: new Date('2023-04-01'),
    sessionTimeout: 30, // 30 minutes
    allowedIPRanges: ['192.168.1.*', '10.0.0.*'],
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'manager' as UserRole,
    department: 'Support',
    title: 'Support Team Lead',
    active: true,
    lastActive: new Date('2023-05-09T16:45:00'),
    createdAt: new Date('2023-01-15T11:30:00'),
    mfaEnabled: true,
    mfaMethod: 'email' as MFAMethod,
    securityQuestions: [
      { question: "What is your favorite book?", answer: "Pride and Prejudice" }
    ],
    loginAttempts: 0,
    passwordLastChanged: new Date('2023-03-15'),
    sessionTimeout: 60, // 60 minutes
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'agent' as UserRole,
    department: 'Support',
    title: 'Support Specialist',
    active: true,
    lastActive: new Date('2023-05-10T10:15:00'),
    createdAt: new Date('2023-02-01T09:00:00'),
    mfaEnabled: false,
    loginAttempts: 0,
    passwordLastChanged: new Date('2023-02-01'),
    sessionTimeout: 120, // 120 minutes
  },
  {
    id: 'user-4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'developer' as UserRole,
    department: 'Engineering',
    title: 'Software Engineer',
    active: true,
    lastActive: new Date('2023-05-10T09:30:00'),
    createdAt: new Date('2023-02-15T14:00:00'),
    mfaEnabled: true,
    mfaMethod: 'sms' as MFAMethod,
    securityQuestions: [
      { question: "What city were you born in?", answer: "Boston" }
    ],
    loginAttempts: 0,
    passwordLastChanged: new Date('2023-04-20'),
    sessionTimeout: 45, // 45 minutes
  },
  {
    id: 'user-5',
    name: 'Alex Turner',
    email: 'alex.turner@example.com',
    role: 'agent' as UserRole,
    department: 'Support',
    title: 'Support Specialist',
    active: false,
    lastActive: new Date('2023-05-01T14:20:00'),
    createdAt: new Date('2023-03-01T10:30:00'),
    mfaEnabled: false,
    loginAttempts: 0,
    passwordLastChanged: new Date('2023-03-01'),
    sessionTimeout: 30, // 30 minutes
  }
];

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Add the missing getAllUsers function
export const getAllUsers = (): User[] => {
  return [...mockUsers];
};

// Get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Update a user
export const updateUser = (updatedUser: User): User => {
  const index = mockUsers.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    mockUsers[index] = { ...updatedUser };
    return mockUsers[index];
  }
  throw new Error(`User with ID ${updatedUser.id} not found`);
};
