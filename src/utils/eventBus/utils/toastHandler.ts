
import { toast } from 'sonner';
import { Notification } from '@/components/shared/notifications/types';
import { getIconForResultType } from '@/components/shared/notifications/iconHelpers';

/**
 * Show a toast notification
 */
export const showToastForNotification = (notification: Notification): void => {
  const icon = getIconForResultType(notification.type);
  
  toast(notification.title, {
    description: notification.message,
    action: {
      label: "View",
      onClick: () => window.location.href = notification.actionUrl || '#'
    },
    icon
  });
};
