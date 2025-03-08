
// This is an update to add the getAllUsers export that was missing

export const mockUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    department: 'IT',
    title: 'System Administrator',
    active: true,
    lastActive: new Date('2023-05-10T12:30:00'),
    createdAt: new Date('2023-01-01T10:00:00')
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'manager',
    department: 'Support',
    title: 'Support Team Lead',
    active: true,
    lastActive: new Date('2023-05-09T16:45:00'),
    createdAt: new Date('2023-01-15T11:30:00')
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'agent',
    department: 'Support',
    title: 'Support Specialist',
    active: true,
    lastActive: new Date('2023-05-10T10:15:00'),
    createdAt: new Date('2023-02-01T09:00:00')
  },
  {
    id: 'user-4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'developer',
    department: 'Engineering',
    title: 'Software Engineer',
    active: true,
    lastActive: new Date('2023-05-10T09:30:00'),
    createdAt: new Date('2023-02-15T14:00:00')
  },
  {
    id: 'user-5',
    name: 'Alex Turner',
    email: 'alex.turner@example.com',
    role: 'agent',
    department: 'Support',
    title: 'Support Specialist',
    active: false,
    lastActive: new Date('2023-05-01T14:20:00'),
    createdAt: new Date('2023-03-01T10:30:00')
  }
];

export const getUserById = (userId: string) => {
  return mockUsers.find(user => user.id === userId);
};

// Add the missing getAllUsers function
export const getAllUsers = () => {
  return [...mockUsers];
};
