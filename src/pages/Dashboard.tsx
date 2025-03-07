
import { TicketPriority } from '@/utils/types/ticket';

// Replace the isHighPriority function to use P1 and P2 as high priority
export const isHighPriority = (priority: TicketPriority): boolean => {
  return priority === 'P1' || priority === 'P2';
};

// Dashboard component (empty for now, will be implemented later)
export const Dashboard = () => {
  return <div>Dashboard Content</div>;
};
