
import { ApiResponse, PaginatedResponse } from '../types/api';
import { KnowledgeArticle, KnowledgeCategory } from '../types/knowledge';
import { mockKnowledgeArticles } from '../mockData/knowledgeArticles';
import { addMonths, isAfter, subMonths } from 'date-fns';

// Get all knowledge articles (with optional filtering)
export const getKnowledgeArticles = async (
  query?: string,
  type?: string,
  categoryId?: string,
  tags?: string[],
  status?: string
): Promise<ApiResponse<PaginatedResponse<KnowledgeArticle>>> => {
  // Simulate API call to fetch articles
  let filteredArticles = [...mockKnowledgeArticles];
  
  // Apply filters
  if (query) {
    const searchLower = query.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchLower) || 
      article.content.toLowerCase().includes(searchLower)
    );
  }
  
  if (type) {
    filteredArticles = filteredArticles.filter(article => article.type === type);
  }
  
  if (tags && tags.length > 0) {
    filteredArticles = filteredArticles.filter(article => 
      tags.some(tag => article.tags.includes(tag))
    );
  }
  
  if (status) {
    filteredArticles = filteredArticles.filter(article => article.status === status);
  }
  
  return {
    success: true,
    data: {
      items: filteredArticles,
      total: filteredArticles.length,
      page: 1,
      limit: 20,
      totalPages: Math.ceil(filteredArticles.length / 20)
    }
  };
};

// Get a single knowledge article by ID
export const getKnowledgeArticleById = async (id: string): Promise<ApiResponse<KnowledgeArticle>> => {
  const article = mockKnowledgeArticles.find(article => article.id === id);
  
  if (!article) {
    return {
      success: false,
      message: 'Article not found',
      statusCode: 404
    };
  }
  
  // Update view count
  const updatedArticle = {...article, viewCount: article.viewCount + 1};
  
  return {
    success: true,
    data: updatedArticle
  };
};

// Create a new knowledge article
export const createKnowledgeArticle = async (
  article: Omit<KnowledgeArticle, 'id' | 'viewCount' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<KnowledgeArticle>> => {
  const newId = `KA-${(mockKnowledgeArticles.length + 1).toString().padStart(3, '0')}`;
  
  const newArticle: KnowledgeArticle = {
    id: newId,
    ...article,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: article.status || 'draft',
    expiryDate: article.expiryDate || addMonths(new Date(), 12) // Default to 1 year if not provided
  };
  
  mockKnowledgeArticles.push(newArticle);
  
  return {
    success: true,
    data: newArticle
  };
};

// Update an existing knowledge article
export const updateKnowledgeArticle = async (
  id: string, 
  updates: Partial<KnowledgeArticle>
): Promise<ApiResponse<KnowledgeArticle>> => {
  const index = mockKnowledgeArticles.findIndex(article => article.id === id);
  
  if (index === -1) {
    return {
      success: false,
      message: 'Article not found',
      statusCode: 404
    };
  }
  
  const updatedArticle = {
    ...mockKnowledgeArticles[index],
    ...updates,
    updatedAt: new Date()
  };
  
  mockKnowledgeArticles[index] = updatedArticle;
  
  return {
    success: true,
    data: updatedArticle
  };
};

// Submit an article for review
export const submitArticleForReview = async (id: string): Promise<ApiResponse<KnowledgeArticle>> => {
  const index = mockKnowledgeArticles.findIndex(article => article.id === id);
  
  if (index === -1) {
    return {
      success: false,
      message: 'Article not found',
      statusCode: 404
    };
  }
  
  const updatedArticle = {
    ...mockKnowledgeArticles[index],
    status: 'pending_review' as const,
    updatedAt: new Date()
  };
  
  mockKnowledgeArticles[index] = updatedArticle;
  
  return {
    success: true,
    data: updatedArticle
  };
};

// Approve an article
export const approveArticle = async (id: string, comments?: string): Promise<ApiResponse<KnowledgeArticle>> => {
  const index = mockKnowledgeArticles.findIndex(article => article.id === id);
  
  if (index === -1) {
    return {
      success: false,
      message: 'Article not found',
      statusCode: 404
    };
  }
  
  const updatedArticle = {
    ...mockKnowledgeArticles[index],
    status: 'approved' as const,
    reviewDate: new Date(),
    reviewComments: comments || mockKnowledgeArticles[index].reviewComments,
    updatedAt: new Date()
  };
  
  mockKnowledgeArticles[index] = updatedArticle;
  
  return {
    success: true,
    data: updatedArticle
  };
};

// Reject an article
export const rejectArticle = async (id: string, comments: string): Promise<ApiResponse<KnowledgeArticle>> => {
  const index = mockKnowledgeArticles.findIndex(article => article.id === id);
  
  if (index === -1) {
    return {
      success: false,
      message: 'Article not found',
      statusCode: 404
    };
  }
  
  const updatedArticle = {
    ...mockKnowledgeArticles[index],
    status: 'rejected' as const,
    reviewDate: new Date(),
    reviewComments: comments,
    updatedAt: new Date()
  };
  
  mockKnowledgeArticles[index] = updatedArticle;
  
  // In a real app, this would trigger a notification to the author
  
  return {
    success: true,
    data: updatedArticle
  };
};

// Delete a knowledge article
export const deleteKnowledgeArticle = async (id: string): Promise<ApiResponse<void>> => {
  const index = mockKnowledgeArticles.findIndex(article => article.id === id);
  
  if (index === -1) {
    return {
      success: false,
      message: 'Article not found',
      statusCode: 404
    };
  }
  
  mockKnowledgeArticles.splice(index, 1);
  
  return {
    success: true
  };
};

// Get knowledge categories
export const getKnowledgeCategories = async (): Promise<ApiResponse<KnowledgeCategory[]>> => {
  // Group articles by type to create categories
  const categories: KnowledgeCategory[] = [];
  const types = [...new Set(mockKnowledgeArticles.map(article => article.type))];
  
  types.forEach((type, index) => {
    const articlesOfType = mockKnowledgeArticles.filter(article => article.type === type);
    categories.push({
      id: `cat-${index + 1}`,
      name: type,
      description: `All ${type.toLowerCase()} articles`,
      articleCount: articlesOfType.length
    });
  });
  
  return {
    success: true,
    data: categories
  };
};

// Get articles with expiry date approaching (1 month before expiry)
export const getExpiringArticles = async (): Promise<ApiResponse<KnowledgeArticle[]>> => {
  const today = new Date();
  const expiringArticles = mockKnowledgeArticles.filter(article => {
    if (!article.expiryDate) return false;
    
    const expiryDate = new Date(article.expiryDate);
    const oneMonthBefore = subMonths(expiryDate, 1);
    
    return isAfter(today, oneMonthBefore) && 
           isAfter(expiryDate, today) && 
           article.status === 'approved';
  });
  
  return {
    success: true,
    data: expiringArticles
  };
};

// Get articles by service
export const getKnowledgeArticlesByService = async (serviceId: string): Promise<ApiResponse<KnowledgeArticle[]>> => {
  // Import helper function to get articles for a specific service
  const { getKnowledgeArticlesForService } = require('../mockData/knowledgeArticles');
  const articles = getKnowledgeArticlesForService(serviceId);
  
  return {
    success: true,
    data: articles.map(art => {
      // Remove the relationship properties from the returned articles
      const { relationshipType, isPrimary, displayOrder, ...article } = art;
      return article;
    })
  };
};
