
import { User } from './userTypes';

export type AnnouncementStatus = 'active' | 'draft' | 'expired';
export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'critical';
export type AnnouncementType = 'outage' | 'maintenance' | 'information' | 'other';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  status: AnnouncementStatus;
  priority: AnnouncementPriority;
  type: AnnouncementType;
  createdBy: string;
  creatorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  expiresAt?: string;
  relatedIncidentId?: string;
  audienceGroups?: string[];
}

export interface AnnouncementFormValues {
  title: string;
  content: string;
  status: AnnouncementStatus;
  priority: AnnouncementPriority;
  type: AnnouncementType;
  expiresAt?: string;
  relatedIncidentId?: string;
  audienceGroups?: string[];
}
