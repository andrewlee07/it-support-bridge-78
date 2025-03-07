
import { ticketApi } from './ticketApi';
import { userApi } from './userApi';
import { assetApi } from './assetApi';
import { changeApi } from './changeApi';
import { slaApi } from './slaApi';
import { emailApi } from './emailApi';
import { dashboardApi } from './dashboardApi';

// Export all APIs
export const api = {
  tickets: ticketApi,
  users: userApi,
  assets: assetApi,
  changes: changeApi,
  slas: slaApi,
  emails: emailApi,
  dashboard: dashboardApi,
};

export default api;
