import { Release, ReleaseStatus } from './types';
import { mockReleases } from './mockData';

// Get all releases with optional filter
export const getReleases = async (filters?: {
  status?: ReleaseStatus;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}): Promise<Release[]> => {
  // Simulating API call with delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let filteredReleases = [...mockReleases];
  
  // Apply filters if provided
  if (filters) {
    if (filters.status) {
      filteredReleases = filteredReleases.filter(release => release.status === filters.status);
    }
    
    if (filters.startDate) {
      filteredReleases = filteredReleases.filter(release => 
        new Date(release.scheduledDate) >= new Date(filters.startDate!)
      );
    }
    
    if (filters.endDate) {
      filteredReleases = filteredReleases.filter(release => 
        new Date(release.scheduledDate) <= new Date(filters.endDate!)
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredReleases = filteredReleases.filter(release => 
        release.name.toLowerCase().includes(searchLower) || 
        release.description.toLowerCase().includes(searchLower)
      );
    }
  }
  
  return filteredReleases;
};

// Get a single release by ID
export const getReleaseById = async (id: string): Promise<Release | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockReleases.find(release => release.id === id) || null;
};

// Create a new release
export const createRelease = async (release: Omit<Release, 'id' | 'createdAt' | 'updatedAt'>): Promise<Release> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newRelease: Release = {
    id: `release-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...release,
  };
  
  // In a real app, you would save this to a database
  mockReleases.push(newRelease);
  
  return newRelease;
};

// Update an existing release
export const updateRelease = async (id: string, updates: Partial<Release>): Promise<Release> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = mockReleases.findIndex(release => release.id === id);
  if (index === -1) {
    throw new Error(`Release with ID ${id} not found`);
  }
  
  const updatedRelease = {
    ...mockReleases[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  mockReleases[index] = updatedRelease;
  
  return updatedRelease;
};

// Delete a release
export const deleteRelease = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = mockReleases.findIndex(release => release.id === id);
  if (index === -1) {
    throw new Error(`Release with ID ${id} not found`);
  }
  
  mockReleases.splice(index, 1);
};
