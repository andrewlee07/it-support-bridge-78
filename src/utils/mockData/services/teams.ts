
// Mock teams
export const teams = [
  { id: 'team-1', name: 'IT Support Team' },
  { id: 'team-2', name: 'Network Team' },
  { id: 'team-3', name: 'Security Team' }
];

export const getTeamById = (id: string) => {
  return teams.find(team => team.id === id);
};
