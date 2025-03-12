
import { Announcement, AnnouncementPriority, AnnouncementStatus, AnnouncementType } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse, PaginatedResponse } from '@/utils/types';

// Sample announcements data
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'System Maintenance Scheduled',
    content: '<p>The system will undergo scheduled maintenance this weekend. Expected downtime is 2 hours.</p>',
    status: 'active',
    priority: 'medium',
    type: 'maintenance',
    createdBy: 'user-1',
    creatorName: 'Admin User',
    createdAt: '2023-08-15T08:00:00Z',
    updatedAt: '2023-08-15T08:00:00Z',
    publishedAt: '2023-08-15T08:00:00Z',
    expiresAt: '2023-08-20T08:00:00Z'
  },
  {
    id: 'ann-002',
    title: 'Email Service Outage',
    content: '<p>We are currently experiencing issues with the email service. Our team is working on resolving this.</p><p>Expected resolution time: 3 hours</p>',
    status: 'active',
    priority: 'high',
    type: 'outage',
    createdBy: 'user-2',
    creatorName: 'Service Manager',
    createdAt: '2023-08-16T10:30:00Z',
    updatedAt: '2023-08-16T10:30:00Z',
    publishedAt: '2023-08-16T10:30:00Z',
    expiresAt: '2023-08-17T10:30:00Z',
    relatedIncidentId: 'INC-20230816-001'
  },
  {
    id: 'ann-003',
    title: 'New Feature Released',
    content: '<p>We\'ve released a new dashboard feature. <strong>Check it out!</strong></p>',
    status: 'active',
    priority: 'low',
    type: 'information',
    createdBy: 'user-1',
    creatorName: 'Admin User',
    createdAt: '2023-08-14T14:00:00Z',
    updatedAt: '2023-08-14T14:00:00Z',
    publishedAt: '2023-08-14T14:00:00Z',
    expiresAt: '2023-08-30T14:00:00Z'
  },
  {
    id: 'ann-004',
    title: 'Upcoming System Changes',
    content: '<p>Several system changes are planned for next month. More details will be provided soon.</p>',
    status: 'draft',
    priority: 'medium',
    type: 'information',
    createdBy: 'user-3',
    creatorName: 'Change Manager',
    createdAt: '2023-08-17T09:15:00Z',
    updatedAt: '2023-08-17T09:15:00Z'
  }
];

// API functions
export const getAnnouncements = async (params?: {
  status?: AnnouncementStatus;
  priority?: AnnouncementPriority;
  type?: AnnouncementType;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<PaginatedResponse<Announcement>>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filtered = [...mockAnnouncements];
  
  // Apply filters
  if (params?.status) {
    filtered = filtered.filter(ann => ann.status === params.status);
  }
  
  if (params?.priority) {
    filtered = filtered.filter(ann => ann.priority === params.priority);
  }
  
  if (params?.type) {
    filtered = filtered.filter(ann => ann.type === params.type);
  }
  
  if (params?.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(ann => 
      ann.title.toLowerCase().includes(search) || 
      ann.content.toLowerCase().includes(search)
    );
  }
  
  // Sort by most recent first
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  // Pagination
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = filtered.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: {
      items: paginatedItems,
      total: filtered.length,
      page: page,
      limit: limit,
      totalPages: Math.ceil(filtered.length / limit)
    }
  };
};

export const getAnnouncementById = async (id: string): Promise<ApiResponse<Announcement>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const announcement = mockAnnouncements.find(ann => ann.id === id);
  
  if (!announcement) {
    return {
      success: false,
      error: 'Announcement not found',
      statusCode: 404
    };
  }
  
  return {
    success: true,
    data: announcement
  };
};

export const createAnnouncement = async (data: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Announcement>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const now = new Date().toISOString();
  const newAnnouncement: Announcement = {
    ...data,
    id: `ann-${uuidv4().substring(0, 8)}`,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.status === 'active' ? now : undefined
  };
  
  mockAnnouncements.push(newAnnouncement);
  
  return {
    success: true,
    data: newAnnouncement
  };
};

export const updateAnnouncement = async (id: string, data: Partial<Announcement>): Promise<ApiResponse<Announcement>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockAnnouncements.findIndex(ann => ann.id === id);
  
  if (index === -1) {
    return {
      success: false,
      error: 'Announcement not found',
      statusCode: 404
    };
  }
  
  const updatedAnnouncement = {
    ...mockAnnouncements[index],
    ...data,
    updatedAt: new Date().toISOString(),
    // Update publishedAt if status changed to active
    publishedAt: data.status === 'active' && mockAnnouncements[index].status !== 'active' 
      ? new Date().toISOString() 
      : mockAnnouncements[index].publishedAt
  };
  
  mockAnnouncements[index] = updatedAnnouncement;
  
  return {
    success: true,
    data: updatedAnnouncement
  };
};

export const deleteAnnouncement = async (id: string): Promise<ApiResponse<{ id: string }>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = mockAnnouncements.findIndex(ann => ann.id === id);
  
  if (index === -1) {
    return {
      success: false,
      error: 'Announcement not found',
      statusCode: 404
    };
  }
  
  mockAnnouncements.splice(index, 1);
  
  return {
    success: true,
    data: { id }
  };
};

export const createAnnouncementFromIncident = async (incidentId: string, announcementData: Partial<Announcement>): Promise<ApiResponse<Announcement>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get incident details (mock implementation)
  // In a real app, you would fetch this from your incident data
  const incidentTitle = `Incident ${incidentId}`;
  const incidentDescription = 'This is an automatically generated announcement from an incident.';
  
  const now = new Date().toISOString();
  const newAnnouncement: Announcement = {
    id: `ann-${uuidv4().substring(0, 8)}`,
    title: announcementData.title || `Outage Notice: ${incidentTitle}`,
    content: announcementData.content || `<p>${incidentDescription}</p>`,
    status: announcementData.status || 'active',
    priority: announcementData.priority || 'high',
    type: announcementData.type || 'outage',
    createdBy: announcementData.createdBy || 'system',
    creatorName: announcementData.creatorName || 'System',
    createdAt: now,
    updatedAt: now,
    publishedAt: (announcementData.status || 'active') === 'active' ? now : undefined,
    expiresAt: announcementData.expiresAt,
    relatedIncidentId: incidentId,
    audienceGroups: announcementData.audienceGroups || ['all-users']
  };
  
  mockAnnouncements.push(newAnnouncement);
  
  return {
    success: true,
    data: newAnnouncement
  };
};
