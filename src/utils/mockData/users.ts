import { User, UserRole, MFAMethod } from '../types/user';

// Mock user data
export const mockUsers: User[] = [
  { 
    id: 'user-1', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'admin' as UserRole,
    department: 'IT',
    active: true,
    mfaEnabled: false,
    lockedUntil: undefined,
    requirePasswordChange: false,
    securityQuestions: [
      {
        question: "What was your first pet's name?",
        answer: "Buddy"
      },
      {
        question: "In what city were you born?",
        answer: "Chicago"
      }
    ]
  },
  { 
    id: 'user-2', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'it' as UserRole,
    department: 'Support',
    active: true,
    mfaEnabled: true,
    mfaMethod: 'email' as MFAMethod,
    securityQuestions: [
      {
        question: "What was your first pet's name?",
        answer: "Max"
      }
    ]
  },
  { 
    id: 'user-3', 
    name: 'Mike Johnson', 
    email: 'mike.johnson@example.com', 
    role: 'user' as UserRole,
    department: 'Marketing',
    active: true,
    mfaEnabled: false,
    securityQuestions: []
  },
  { 
    id: 'user-4', 
    name: 'Morgan Lee', 
    email: 'morgan.lee@example.com', 
    role: 'agent' as UserRole,
    department: 'Support',
    active: true,
    mfaEnabled: false,
    securityQuestions: []
  },
  { 
    id: 'user-5', 
    name: 'Casey Wilson', 
    email: 'casey.wilson@example.com', 
    role: 'manager' as UserRole,
    department: 'Service',
    active: true,
    mfaEnabled: true,
    mfaMethod: 'email' as MFAMethod,
    securityQuestions: [
      {
        question: "What is your mother's maiden name?",
        answer: "Johnson"
      },
      {
        question: "What was the name of your elementary school?",
        answer: "Lincoln"
      }
    ]
  }
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get all users
export const getAllUsers = (): User[] => {
  return [...mockUsers];
};

// Helper function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

// Helper function to update a user
export const updateUser = (updatedUser: User): User | null => {
  const index = mockUsers.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...updatedUser };
    return mockUsers[index];
  }
  return null;
};

// Helper function to add a new user
export const addUser = (user: User): User => {
  mockUsers.push(user);
  return user;
};

// Helper function to remove a user
export const removeUser = (id: string): User | null => {
  const index = mockUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    const removedUser = mockUsers[index];
    mockUsers.splice(index, 1);
    return removedUser;
  }
  return null;
};
