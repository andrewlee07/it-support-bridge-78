
import { EmailTemplate, ApiResponse } from '../types';
import { mockEmailTemplates, simulateApiResponse } from '../mockData';

// Email Template API
export const emailApi = {
  // Get all email templates
  getEmailTemplates: async (): Promise<ApiResponse<EmailTemplate[]>> => {
    return simulateApiResponse(mockEmailTemplates);
  },
};
