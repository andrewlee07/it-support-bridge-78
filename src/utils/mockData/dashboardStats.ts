
import { mockTickets } from './tickets';
import { mockChangeRequests } from './changeManagement';

// Dashboard stats
export const getDashboardStats = () => {
  const openIncidents = mockTickets.filter(
    ticket => ticket.type === 'incident' && ticket.status === 'open'
  ).length;
  
  const inProgressIncidents = mockTickets.filter(
    ticket => ticket.type === 'incident' && ticket.status === 'in-progress'
  ).length;
  
  const openServiceRequests = mockTickets.filter(
    ticket => ticket.type === 'service' && ticket.status === 'open'
  ).length;
  
  const inProgressServiceRequests = mockTickets.filter(
    ticket => ticket.type === 'service' && ticket.status === 'in-progress'
  ).length;
  
  const pendingChangeRequests = mockChangeRequests.filter(
    change => change.status === 'submitted'
  ).length;
  
  const upcomingChanges = mockChangeRequests.filter(
    change => change.status === 'approved' && new Date(change.startDate) > new Date()
  ).length;
  
  // Mock SLA compliance calculation - in a real app, this would be more complex
  const slaCompliance = 85;
  
  const recentTickets = [...mockTickets].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  // Create ticket distribution by category
  const categories = [...new Set(mockTickets.map(ticket => ticket.category))];
  const ticketsByCategory = categories.map(category => ({
    category,
    count: mockTickets.filter(ticket => ticket.category === category).length
  }));
  
  // Create ticket distribution by priority
  const priorities = [...new Set(mockTickets.map(ticket => ticket.priority))];
  const ticketsByPriority = priorities.map(priority => ({
    priority,
    count: mockTickets.filter(ticket => ticket.priority === priority).length
  }));
  
  return {
    openIncidents,
    inProgressIncidents,
    openServiceRequests,
    inProgressServiceRequests,
    pendingChangeRequests,
    upcomingChanges,
    slaCompliance,
    recentTickets,
    ticketsByCategory,
    ticketsByPriority
  };
};
