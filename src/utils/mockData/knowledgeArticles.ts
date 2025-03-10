import { ServiceKnowledge, ServiceKnowledgeRelationshipType } from '../types/service';
import { KnowledgeArticle } from '../types/knowledge';
import { addMonths, subMonths, isAfter, isBefore, addDays } from 'date-fns';

// Mock knowledge articles
export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'KA-001',
    title: 'Salesforce CRM User Guide',
    content: 'This guide covers the basic usage of Salesforce CRM for end users...',
    type: 'Documentation',
    tags: ['salesforce', 'crm', 'user guide'],
    authorId: 'user-2',
    viewCount: 243,
    createdAt: new Date(2023, 1, 15),
    updatedAt: new Date(2023, 1, 15),
    status: 'approved',
    expiryDate: addMonths(new Date(), 6)
  },
  {
    id: 'KA-002',
    title: 'Known Issue: Salesforce Contact Import Limitations',
    content: 'There is a known issue with importing contacts to Salesforce when...',
    type: 'Known Issue',
    tags: ['salesforce', 'contacts', 'import', 'issue'],
    authorId: 'user-3',
    viewCount: 156,
    createdAt: new Date(2023, 2, 10),
    updatedAt: new Date(2023, 2, 10),
    status: 'approved',
    expiryDate: addMonths(new Date(), 9)
  },
  {
    id: 'KA-003',
    title: 'Microsoft 365 Email Setup Guide',
    content: 'This guide covers how to set up Microsoft 365 email on desktop and mobile devices...',
    type: 'Documentation',
    tags: ['microsoft 365', 'email', 'setup'],
    authorId: 'user-1',
    viewCount: 382,
    createdAt: new Date(2023, 2, 5),
    updatedAt: new Date(2023, 2, 5),
    status: 'approved',
    expiryDate: addMonths(new Date(), 4)
  },
  {
    id: 'KA-004',
    title: 'Frequently Asked Questions: Office 365 Applications',
    content: 'Find answers to common questions about Office 365 applications...',
    type: 'FAQ',
    tags: ['microsoft 365', 'office', 'faq'],
    authorId: 'user-3',
    viewCount: 215,
    createdAt: new Date(2023, 3, 12),
    updatedAt: new Date(2023, 3, 12),
    status: 'approved',
    expiryDate: addMonths(new Date(), 2) // Expiring soon
  },
  {
    id: 'KA-005',
    title: 'Corporate WiFi Connection Guide',
    content: 'Follow these steps to connect to the corporate WiFi network...',
    type: 'Documentation',
    tags: ['wifi', 'network', 'connectivity'],
    authorId: 'user-1',
    viewCount: 298,
    createdAt: new Date(2023, 1, 20),
    updatedAt: new Date(2023, 1, 20),
    status: 'pending_review',
    expiryDate: addMonths(new Date(), 12)
  },
  {
    id: 'KA-006',
    title: 'Known Issue: WiFi Connectivity in Building B',
    content: 'Users in Building B may experience intermittent WiFi connectivity issues...',
    type: 'Known Issue',
    tags: ['wifi', 'network', 'issue', 'building b'],
    authorId: 'user-1',
    viewCount: 123,
    createdAt: new Date(2023, 4, 5),
    updatedAt: new Date(2023, 4, 5),
    status: 'draft',
    reviewComments: 'Please provide more details on the connectivity issues',
    expiryDate: addMonths(new Date(), 8)
  },
  {
    id: 'KA-007',
    title: 'Power BI Dashboard Creation Guide',
    content: 'Learn how to create effective dashboards in Power BI...',
    type: 'Documentation',
    tags: ['power bi', 'reporting', 'dashboards'],
    authorId: 'user-4',
    viewCount: 187,
    createdAt: new Date(2023, 3, 25),
    updatedAt: new Date(2023, 3, 25),
    status: 'rejected',
    reviewerId: 'user-1',
    reviewDate: new Date(2023, 3, 27),
    reviewComments: 'This guide needs more screenshots and clearer instructions.',
    expiryDate: addMonths(new Date(), 10)
  },
  {
    id: 'KA-008',
    title: 'VPN Access Troubleshooting',
    content: 'If you are having trouble connecting to the VPN, try these steps...',
    type: 'FAQ',
    tags: ['vpn', 'connectivity', 'troubleshooting'],
    authorId: 'user-1',
    viewCount: 276,
    createdAt: new Date(2023, 2, 15),
    updatedAt: new Date(2023, 2, 15),
    status: 'approved',
    reviewerId: 'user-5',
    reviewDate: new Date(2023, 2, 16),
    expiryDate: subMonths(new Date(), 1) // Already expired
  }
];

// Mock service-knowledge relationships
export const mockServiceKnowledge: ServiceKnowledge[] = [
  {
    id: 'SK-001',
    serviceId: 'SVC-001', // Salesforce CRM
    knowledgeArticleId: 'KA-001',
    relationshipType: 'documentation',
    isPrimary: true,
    displayOrder: 1
  },
  {
    id: 'SK-002',
    serviceId: 'SVC-001', // Salesforce CRM
    knowledgeArticleId: 'KA-002',
    relationshipType: 'known-issue',
    isPrimary: true,
    displayOrder: 2
  },
  {
    id: 'SK-003',
    serviceId: 'SVC-002', // Microsoft 365
    knowledgeArticleId: 'KA-003',
    relationshipType: 'documentation',
    isPrimary: true,
    displayOrder: 1
  },
  {
    id: 'SK-004',
    serviceId: 'SVC-002', // Microsoft 365
    knowledgeArticleId: 'KA-004',
    relationshipType: 'faq',
    isPrimary: true,
    displayOrder: 2
  },
  {
    id: 'SK-005',
    serviceId: 'SVC-003', // Corporate WiFi
    knowledgeArticleId: 'KA-005',
    relationshipType: 'documentation',
    isPrimary: true,
    displayOrder: 1
  },
  {
    id: 'SK-006',
    serviceId: 'SVC-003', // Corporate WiFi
    knowledgeArticleId: 'KA-006',
    relationshipType: 'known-issue',
    isPrimary: true,
    displayOrder: 2
  },
  {
    id: 'SK-007',
    serviceId: 'SVC-004', // Power BI
    knowledgeArticleId: 'KA-007',
    relationshipType: 'documentation',
    isPrimary: true,
    displayOrder: 1
  },
  {
    id: 'SK-008',
    serviceId: 'SVC-006', // VPN Access
    knowledgeArticleId: 'KA-008',
    relationshipType: 'faq',
    isPrimary: true,
    displayOrder: 1
  }
];

// Helper functions
export const getKnowledgeArticleById = (id: string): KnowledgeArticle | undefined => {
  return mockKnowledgeArticles.find(article => article.id === id);
};

export const getAllKnowledgeArticles = (): KnowledgeArticle[] => {
  return [...mockKnowledgeArticles];
};

export const getKnowledgeArticlesByType = (type: string): KnowledgeArticle[] => {
  return mockKnowledgeArticles.filter(article => article.type === type);
};

export const getKnowledgeArticlesByAuthorId = (authorId: string): KnowledgeArticle[] => {
  return mockKnowledgeArticles.filter(article => article.authorId === authorId);
};

export const getKnowledgeArticlesForService = (serviceId: string): (KnowledgeArticle & { relationshipType: ServiceKnowledgeRelationshipType, isPrimary: boolean, displayOrder: number })[] => {
  const serviceKnowledge = mockServiceKnowledge.filter(sk => sk.serviceId === serviceId);
  
  return serviceKnowledge.map(sk => {
    const article = getKnowledgeArticleById(sk.knowledgeArticleId);
    if (!article) return null;
    
    return {
      ...article,
      relationshipType: sk.relationshipType,
      isPrimary: sk.isPrimary,
      displayOrder: sk.displayOrder
    };
  }).filter(Boolean) as (KnowledgeArticle & { relationshipType: ServiceKnowledgeRelationshipType, isPrimary: boolean, displayOrder: number })[];
};

export const getServicesForKnowledgeArticle = (articleId: string): string[] => {
  const serviceKnowledge = mockServiceKnowledge.filter(sk => sk.knowledgeArticleId === articleId);
  return serviceKnowledge.map(sk => sk.serviceId);
};

// Generate a new knowledge article ID
export const generateKnowledgeArticleId = (): string => {
  const existingIds = mockKnowledgeArticles.map(article => {
    const numericPart = article.id.replace('KA-', '');
    return parseInt(numericPart, 10);
  });
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  const nextId = maxId + 1;
  return `KA-${nextId.toString().padStart(3, '0')}`;
};

// CRUD operations for knowledge articles
export const addKnowledgeArticle = (article: Omit<KnowledgeArticle, 'id' | 'viewCount' | 'createdAt' | 'updatedAt'>): KnowledgeArticle => {
  const newArticle: KnowledgeArticle = {
    id: generateKnowledgeArticleId(),
    ...article,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    expiryDate: article.expiryDate || addMonths(new Date(), 12) // Default to 1 year
  };
  
  mockKnowledgeArticles.push(newArticle);
  return newArticle;
};

export const updateKnowledgeArticle = (id: string, article: Partial<KnowledgeArticle>): KnowledgeArticle | null => {
  const index = mockKnowledgeArticles.findIndex(ka => ka.id === id);
  if (index === -1) return null;
  
  mockKnowledgeArticles[index] = {
    ...mockKnowledgeArticles[index],
    ...article,
    updatedAt: new Date()
  };
  
  return mockKnowledgeArticles[index];
};

export const deleteKnowledgeArticle = (id: string): KnowledgeArticle | null => {
  const index = mockKnowledgeArticles.findIndex(ka => ka.id === id);
  if (index === -1) return null;
  
  const deletedArticle = mockKnowledgeArticles[index];
  mockKnowledgeArticles.splice(index, 1);
  
  // Also delete any service-knowledge relationships
  const relatedSKs = mockServiceKnowledge.filter(sk => sk.knowledgeArticleId === id);
  relatedSKs.forEach(sk => {
    const skIndex = mockServiceKnowledge.findIndex(item => item.id === sk.id);
    if (skIndex !== -1) {
      mockServiceKnowledge.splice(skIndex, 1);
    }
  });
  
  return deletedArticle;
};

// Service-knowledge relationship operations
export const associateKnowledgeWithService = (
  serviceId: string,
  knowledgeArticleId: string,
  relationshipType: ServiceKnowledgeRelationshipType,
  isPrimary: boolean = false
): ServiceKnowledge => {
  // Check if relationship already exists
  const existing = mockServiceKnowledge.find(
    sk => sk.serviceId === serviceId && sk.knowledgeArticleId === knowledgeArticleId
  );
  
  if (existing) {
    existing.relationshipType = relationshipType;
    existing.isPrimary = isPrimary;
    return existing;
  }
  
  // Get current display order max value
  const relatedItems = mockServiceKnowledge.filter(sk => sk.serviceId === serviceId);
  const maxDisplayOrder = relatedItems.length > 0 
    ? Math.max(...relatedItems.map(item => item.displayOrder || 0))
    : 0;
  
  // Generate new ID
  const newId = `SK-${(mockServiceKnowledge.length + 1).toString().padStart(3, '0')}`;
  
  const newServiceKnowledge: ServiceKnowledge = {
    id: newId,
    serviceId,
    knowledgeArticleId,
    relationshipType,
    isPrimary,
    displayOrder: maxDisplayOrder + 1
  };
  
  mockServiceKnowledge.push(newServiceKnowledge);
  return newServiceKnowledge;
};

export const dissociateKnowledgeFromService = (serviceId: string, knowledgeArticleId: string): boolean => {
  const index = mockServiceKnowledge.findIndex(
    sk => sk.serviceId === serviceId && sk.knowledgeArticleId === knowledgeArticleId
  );
  
  if (index === -1) return false;
  
  mockServiceKnowledge.splice(index, 1);
  return true;
};

export const updateServiceKnowledgeOrder = (
  serviceId: string,
  knowledgeArticleId: string,
  newDisplayOrder: number
): ServiceKnowledge | null => {
  const skIndex = mockServiceKnowledge.findIndex(
    sk => sk.serviceId === serviceId && sk.knowledgeArticleId === knowledgeArticleId
  );
  
  if (skIndex === -1) return null;
  
  mockServiceKnowledge[skIndex].displayOrder = newDisplayOrder;
  return mockServiceKnowledge[skIndex];
};

export const incrementKnowledgeArticleViewCount = (id: string): number => {
  const article = mockKnowledgeArticles.find(ka => ka.id === id);
  if (!article) return 0;
  
  article.viewCount += 1;
  return article.viewCount;
};

// Check for articles nearing expiry and notify authors
export const checkExpiringArticles = () => {
  const today = new Date();
  const expiringArticles = mockKnowledgeArticles.filter(article => {
    if (!article.expiryDate) return false;
    
    // Check if article expires within one month
    const expiryDate = new Date(article.expiryDate);
    const oneMonthBefore = subMonths(expiryDate, 1);
    
    // Check if we're in the "notification window" and haven't sent a notification yet
    return isAfter(today, oneMonthBefore) && 
           isBefore(today, expiryDate) && 
           (!article.lastReviewNotificationDate || 
            isAfter(today, addDays(new Date(article.lastReviewNotificationDate), 7)));
  });
  
  return expiringArticles;
};
