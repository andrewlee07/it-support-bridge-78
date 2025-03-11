
/**
 * Knowledge Article event data types
 */

// Knowledge Article event data
export interface KnowledgeArticleEventData {
  articleId: string;
  title: string;
  content?: string;
  status: string;
  category?: string;
  tags?: string[];
  author?: string;
  updatedFields?: string[];
  publishedBy?: string;
  publishDate?: string;
  version?: string;
}
