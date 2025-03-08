import React from 'react';
// This file is now deprecated as routes are defined directly in index.tsx
// Keeping as a placeholder to avoid build errors until fully refactored

interface TicketRoutesProps {
  type: 'incident' | 'service';
}

export const TicketRoutes: React.FC<TicketRoutesProps> = () => null;
