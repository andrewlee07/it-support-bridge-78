
import { useState, useEffect } from 'react';
import { Bug } from '@/utils/types/test/bug';

// Dummy data for demo purposes
const mockBugs: Bug[] = [
  {
    id: '1',
    title: 'Login button not working',
    description: 'Users cannot log in using the main login button on the homepage',
    status: 'open',
    severity: 'critical',
    priority: 'high',
    assignedDeveloper: 'John Smith',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user1',
    stepsToReproduce: ['Open login page', 'Click login button', 'Nothing happens']
  },
  {
    id: '2',
    title: 'Search results not displaying correctly',
    description: 'Search results are not matching the search query',
    status: 'in-progress',
    severity: 'high',
    priority: 'medium',
    assignedDeveloper: 'Jane Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user2',
    stepsToReproduce: ['Enter search term', 'Click search', 'Results don\'t match query']
  },
  {
    id: '3',
    title: 'Dashboard chart not rendering',
    description: 'The pie chart on the dashboard page is not displaying properly',
    status: 'open',
    severity: 'medium',
    priority: 'medium',
    assignedDeveloper: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user1',
    stepsToReproduce: ['Navigate to dashboard', 'Observe pie chart area', 'Chart is missing or broken']
  },
  {
    id: '4',
    title: 'Mobile layout broken on iPhone 13',
    description: 'The layout is breaking on iPhone 13 devices in portrait mode',
    status: 'resolved',
    severity: 'low',
    priority: 'low',
    assignedDeveloper: 'Alex Wilson',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user3',
    stepsToReproduce: ['Open app on iPhone 13', 'View in portrait mode', 'Observe layout issues']
  },
  {
    id: '5',
    title: 'API rate limiting not working',
    description: 'The API rate limiting feature is not working as expected',
    status: 'open',
    severity: 'critical',
    priority: 'high',
    assignedDeveloper: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user2',
    stepsToReproduce: ['Make repeated API calls', 'Observe no rate limiting being applied']
  },
];

export const useBugs = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/bugs');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setBugs(mockBugs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bugs:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchBugs();
  }, []);

  return { bugs, isLoading, isError };
};
