
import { v4 as uuidv4 } from 'uuid';
import { Bug } from '../types/testTypes';
import { delay, simulateApiResponse } from './apiHelpers';
import { testCases } from './testCases';

// Sample Bugs
export const bugs: Bug[] = [
  {
    id: uuidv4(),
    title: 'Login button unresponsive after multiple attempts',
    description: 'After 3 failed login attempts, the login button becomes unresponsive',
    stepsToReproduce: [
      'Navigate to login page',
      'Enter invalid credentials 3 times in a row',
      'Try to click the login button again'
    ],
    severity: 'high',
    priority: 'high',
    status: 'new',
    assignedDeveloper: '2', // Jane Smith (IT Staff)
    relatedTestCase: testCases[1].id,
    attachment: '/lovable-uploads/bf3633e2-5031-4a59-ab35-ffd5b863fbfc.png',
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2023, 11, 1),
    createdBy: '3' // Bob Johnson (End User)
  },
  {
    id: uuidv4(),
    title: 'Password reset email not received',
    description: 'Password reset email is not being received after clicking submit',
    stepsToReproduce: [
      'Navigate to login page',
      'Click on "Forgot password"',
      'Enter email address',
      'Click submit',
      'Check email inbox'
    ],
    severity: 'medium',
    priority: 'medium',
    status: 'in-progress',
    assignedDeveloper: '1', // John Doe (Admin)
    relatedTestCase: testCases[2].id,
    createdAt: new Date(2023, 11, 5),
    updatedAt: new Date(2023, 11, 7),
    createdBy: '2' // Jane Smith (IT Staff)
  }
];

// API mocks for bugs
export const fetchBugs = () => {
  return simulateApiResponse(bugs);
};

export const fetchBugById = (id: string) => {
  const bug = bugs.find(b => b.id === id);
  return simulateApiResponse(bug);
};

export const createBug = async (
  bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>,
  userId: string
) => {
  await delay(500);
  const newBug: Bug = {
    ...bug,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: userId // Using the provided userId
  };
  bugs.push(newBug);
  return simulateApiResponse(newBug);
};

export const updateBug = async (
  id: string,
  updates: Partial<Omit<Bug, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>
) => {
  await delay(500);
  const bugIndex = bugs.findIndex(b => b.id === id);
  if (bugIndex === -1) {
    return simulateApiResponse(null, 'Bug not found');
  }
  
  bugs[bugIndex] = {
    ...bugs[bugIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  return simulateApiResponse(bugs[bugIndex]);
};
