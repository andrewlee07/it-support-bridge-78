
import { MaintenanceConfig } from '@/utils/types/eventBus/maintenanceTypes';

/**
 * Manages maintenance mode configuration for the EventBus
 */
class MaintenanceManager {
  private activeMaintenanceConfig: MaintenanceConfig | null = null;
  private scheduledMaintenances: MaintenanceConfig[] = [];
  private debugMode = false;

  /**
   * Set active maintenance configuration
   * @param config The maintenance configuration
   */
  public setActiveMaintenanceConfig(config: MaintenanceConfig): void {
    this.activeMaintenanceConfig = config;
    
    if (this.debugMode) {
      console.log(`MaintenanceManager: Set active maintenance config "${config.name}"`);
    }
  }

  /**
   * Get active maintenance configuration
   */
  public getActiveMaintenanceConfig(): MaintenanceConfig | null {
    return this.activeMaintenanceConfig;
  }

  /**
   * Schedule a maintenance window
   * @param config The maintenance configuration to schedule
   */
  public scheduleMaintenanceWindow(config: MaintenanceConfig): void {
    this.scheduledMaintenances.push(config);
    
    if (this.debugMode) {
      console.log(`MaintenanceManager: Scheduled maintenance "${config.name}" from ${config.startTime} to ${config.endTime}`);
    }
  }

  /**
   * Get all scheduled maintenance windows
   */
  public getScheduledMaintenances(): MaintenanceConfig[] {
    return [...this.scheduledMaintenances];
  }

  /**
   * Cancel a scheduled maintenance window
   * @param id The ID of the maintenance configuration to cancel
   * @returns boolean indicating if cancellation was successful
   */
  public cancelScheduledMaintenance(id: string): boolean {
    const initialLength = this.scheduledMaintenances.length;
    this.scheduledMaintenances = this.scheduledMaintenances.filter(m => m.id !== id);
    const removed = initialLength > this.scheduledMaintenances.length;
    
    if (removed && this.debugMode) {
      console.log(`MaintenanceManager: Cancelled scheduled maintenance ${id}`);
    }
    
    return removed;
  }

  /**
   * Check if event type is suppressed during current maintenance
   * @param eventType The event type to check
   * @returns boolean indicating if the event type is suppressed
   */
  public isEventTypeSuppressed(eventType: string): boolean {
    if (!this.activeMaintenanceConfig) {
      return false;
    }
    
    const { suppressionConfig } = this.activeMaintenanceConfig;
    
    if (suppressionConfig.mode === 'all') {
      return true;
    }
    
    return suppressionConfig.suppressedTypes?.includes(eventType as any) || false;
  }

  /**
   * Set debug mode
   */
  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }
}

export default MaintenanceManager;
