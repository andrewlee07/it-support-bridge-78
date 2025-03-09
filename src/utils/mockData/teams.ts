
// Mock data for teams
export const mockTeams = [
  { id: 'team-it', name: 'IT Support' },
  { id: 'team-infrastructure', name: 'Infrastructure Team' },
  { id: 'team-applications', name: 'Applications Support' },
  { id: 'team-analytics', name: 'Analytics Team' },
  { id: 'team-sales', name: 'Sales Operations' }
];

// Helper function to get team by ID
export const getTeamById = (id: string): { id: string, name: string } | undefined => {
  return mockTeams.find(team => team.id === id);
};
