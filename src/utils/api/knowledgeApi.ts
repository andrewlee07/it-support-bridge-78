
import { ApiResponse, PaginatedResponse } from '../types/api';
import { KnowledgeArticle, KnowledgeCategory } from '../types/knowledge';
import { mockKnowledgeArticles } from '../mockData/knowledgeArticles';

// Get all knowledge articles (with optional filtering)
export const getKnowledgeArticles = async (
  query?: string,
  type?: string,
  categoryId?: string,
  tags?: string[]
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
export const createKnowledgeArticle = async (article: Omit<KnowledgeArticle, 'id' | 'viewCount' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<KnowledgeArticle>> => {
  const newId = `KA-${(mockKnowledgeArticles.length + 1).toString().padStart(3, '0')}`;
  
  const newArticle: KnowledgeArticle = {
    id: newId,
    ...article,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockKnowledgeArticles.push(newArticle);
  
  return {
    success: true,
    data: newArticle
  };
};

// Update an existing knowledge article
export const updateKnowledgeArticle = async (id: string, updates: Partial<KnowledgeArticle>): Promise<ApiResponse<KnowledgeArticle>> => {
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
