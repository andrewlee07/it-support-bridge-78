
export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  type: string; // "Documentation", "Known Issue", "FAQ", "Guide", etc.
  tags: string[];
  authorId: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  serviceId?: string;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  description?: string;
  articleCount: number;
}

export type ArticleSortOption = 'newest' | 'oldest' | 'most-viewed' | 'title-asc' | 'title-desc';
