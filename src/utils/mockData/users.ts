
// Mock user data
const mockUsers = [
  { id: 'user-1', name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'Admin' },
  { id: 'user-2', name: 'Jamie Smith', email: 'jamie.smith@example.com', role: 'Support Manager' },
  { id: 'user-3', name: 'Taylor Brown', email: 'taylor.brown@example.com', role: 'IT Specialist' },
  { id: 'user-4', name: 'Morgan Lee', email: 'morgan.lee@example.com', role: 'Support Analyst' },
  { id: 'user-5', name: 'Casey Wilson', email: 'casey.wilson@example.com', role: 'Service Manager' }
];

// Helper function to get user by ID
export const getUserById = (id: string) => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get all users
export const getAllUsers = () => {
  return [...mockUsers];
};
