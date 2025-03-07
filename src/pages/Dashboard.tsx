
// Replace the isHighPriority function to use P1 and P2 as high priority
const isHighPriority = (priority: TicketPriority): boolean => {
  return priority === 'P1' || priority === 'P2';
};
