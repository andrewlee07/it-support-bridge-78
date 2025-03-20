
import { useNavigate } from 'react-router-dom';
import { useAppNavigation } from '../routes/navigationUtils';
import { toast } from 'sonner';

/**
 * Button action types for consistent handling across the application
 */
export type ButtonActionType = 
  | 'navigate'   // Navigate to a route
  | 'modal'      // Open a modal/dialog
  | 'api'        // Make an API call
  | 'function'   // Execute a function
  | 'download'   // Download a file
  | 'link'       // External link
  | 'status'     // Change status
  | 'toggle';    // Toggle a state

export interface ButtonAction {
  type: ButtonActionType;
  // For navigation actions
  route?: string;
  // For function executions
  handler?: () => void;
  // For API calls
  apiCall?: () => Promise<any>;
  // For modals
  modalId?: string;
  // For status changes
  newStatus?: string;
  // Common properties
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  // For custom params
  params?: Record<string, any>;
}

/**
 * Hook for handling consistent button actions throughout the application
 * 
 * This provides a centralized way to handle button clicks with proper
 * error handling, navigation, and user feedback.
 */
export const useButtonActions = () => {
  const navigate = useNavigate();
  const appNavigation = useAppNavigation();

  /**
   * Execute a button action based on its type and parameters
   */
  const executeAction = async (action: ButtonAction) => {
    try {
      switch (action.type) {
        case 'navigate':
          if (action.route) {
            if (action.route.startsWith('/')) {
              navigate(action.route);
            } else {
              // Use the typed navigation functions if available
              const navigationFunction = (appNavigation as any)[`goTo${action.route.charAt(0).toUpperCase() + action.route.slice(1)}`];
              if (typeof navigationFunction === 'function') {
                navigationFunction(action.params?.id);
              } else {
                // Fallback to generic navigation
                appNavigation.navigateTo(action.route);
              }
            }
          }
          break;

        case 'function':
          if (action.handler) {
            await action.handler();
          }
          break;

        case 'api':
          if (action.apiCall) {
            await action.apiCall();
            if (action.successMessage) {
              toast.success(action.successMessage);
            }
          }
          break;

        case 'modal':
          if (action.modalId && action.handler) {
            action.handler();
          }
          break;

        case 'status':
          if (action.newStatus && action.handler) {
            await action.handler();
            if (action.successMessage) {
              toast.success(action.successMessage);
            }
          }
          break;

        case 'toggle':
          if (action.handler) {
            action.handler();
          }
          break;

        case 'download':
          if (action.handler) {
            action.handler();
          }
          break;

        case 'link':
          if (action.route) {
            window.open(action.route, '_blank');
          }
          break;
      }
    } catch (error) {
      console.error('Button action failed:', error);
      toast.error(action.errorMessage || 'Action failed. Please try again.');
    }
  };

  /**
   * Create a click handler for a button that executes the given action
   */
  const createClickHandler = (action: ButtonAction) => {
    return async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (action.requiresConfirmation) {
        // For now we just use a simple confirm, but this could be replaced
        // with a more sophisticated confirmation dialog
        if (window.confirm(action.confirmationMessage || 'Are you sure?')) {
          await executeAction(action);
        }
      } else {
        await executeAction(action);
      }
    };
  };

  return {
    executeAction,
    createClickHandler
  };
};
