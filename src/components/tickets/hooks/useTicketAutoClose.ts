
import { useState, useEffect } from 'react';
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { addAuditEntry } from '@/utils/auditUtils';
import { addDays, isAfter } from 'date-fns';
import { getConfigurationValue } from '@/hooks/useModuleConfigurations';

/**
 * Apply auto-close logic to tickets
 * Closes tickets that have been resolved/fulfilled based on configured timeframe
 */
export const applyAutoCloseLogic = (tickets: Ticket[], type: 'incident' | 'service'): Ticket[] => {
  // Get the configured auto-close timeframe
  const moduleType = type === 'incident' ? 'incident' : 'service-request';
  const autoCloseDays = parseInt(
    getConfigurationValue(moduleType, 'autoCloseTimeframeInDays', '5')
  );
  
  return tickets.map(ticket => {
    // Auto-close logic: if resolved/fulfilled for configured days, change to closed
    if (
      (ticket.status === 'resolved' || ticket.status === 'fulfilled') && 
      ticket.resolvedAt
    ) {
      const autoCloseDate = addDays(new Date(ticket.resolvedAt), autoCloseDays);
      if (isAfter(new Date(), autoCloseDate)) {
        const status: TicketStatus = 'closed';
        const auditMessage = type === 'service' 
          ? `Service request automatically closed after ${autoCloseDays} days of being fulfilled` 
          : `Incident automatically closed after ${autoCloseDays} days of being resolved`;
          
        return {
          ...ticket,
          status,
          updatedAt: new Date(),
          audit: addAuditEntry(
            ticket.audit,
            ticket.id,
            'ticket',
            auditMessage,
            'system'
          ),
        };
      }
    }
    return ticket;
  });
};

/**
 * Hook to manage ticket auto-close settings
 */
export const useTicketAutoClose = (moduleType: 'incident' | 'service-request') => {
  const [autoCloseEnabled, setAutoCloseEnabled] = useState(true);
  const [autoCloseDays, setAutoCloseDays] = useState(5);
  
  // Load settings from configuration
  useEffect(() => {
    const enabled = getConfigurationValue(moduleType, 'autoCloseEnabled', 'true') === 'true';
    const days = parseInt(getConfigurationValue(moduleType, 'autoCloseTimeframeInDays', '5'));
    
    setAutoCloseEnabled(enabled);
    setAutoCloseDays(days);
  }, [moduleType]);
  
  // Update settings
  const updateAutoCloseSettings = async (enabled: boolean, days: number) => {
    // In a real app, this would save to the configuration system
    console.log(`Updating auto-close settings for ${moduleType}: enabled=${enabled}, days=${days}`);
    setAutoCloseEnabled(enabled);
    setAutoCloseDays(days);
    return true;
  };
  
  return {
    autoCloseEnabled,
    autoCloseDays,
    updateAutoCloseSettings
  };
};
