
/**
 * Types related to maintenance mode in the event bus
 */
import { EventType } from './eventTypes';

/**
 * Maintenance mode configuration
 */
export interface MaintenanceConfig {
  id: string;
  name: string;
  status: 'scheduled' | 'active' | 'completed';
  startTime: string;
  endTime: string;
  suppressionConfig: {
    mode: 'all' | 'selective';
    suppressedTypes?: EventType[];
    suppressedChannels?: ('email' | 'webhook' | 'inApp')[];
    allowInApp: boolean;
  };
  catchupConfig: {
    mode: 'none' | 'all' | 'digest';
    digestGrouping?: 'by-type' | 'by-service' | 'by-priority';
  };
}
