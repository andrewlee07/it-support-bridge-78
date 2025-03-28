
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Ticket } from '@/utils/types/ticket';
import { mockTickets, getTicketsByType } from '@/utils/mockData/tickets';

export const usePortalData = () => {
  const { user } = useAuth();
  const [userIncidents, setUserIncidents] = useState<Ticket[]>([]);
  const [userRequests, setUserRequests] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserTickets = () => {
      setLoading(true);
      
      if (!user) {
        setUserIncidents([]);
        setUserRequests([]);
        setLoading(false);
        return;
      }
      
      // In a real application, we would filter tickets based on the current user's ID
      // For mock data, we'll simulate this filtering
      const allIncidents = getTicketsByType('incident');
      const allRequests = getTicketsByType('service');
      
      // Filter tickets for current user (in a real app, this would use user.id)
      // For demo, we're just simulating this with the first few tickets
      const filteredIncidents = allIncidents.slice(0, 5);
      const filteredRequests = allRequests.slice(0, 5);
      
      setUserIncidents(filteredIncidents);
      setUserRequests(filteredRequests);
      setLoading(false);
    };
    
    fetchUserTickets();
  }, [user]);
  
  // Add a comment to a ticket (for end user simplicity)
  const addUserComment = (ticketId: string, comment: string) => {
    // In a real app, this would make an API call
    console.log(`Adding comment to ticket ${ticketId}: ${comment}`);
    // Here we would update the ticket in the state
  };
  
  return {
    userIncidents,
    userRequests,
    loading,
    addUserComment
  };
};
