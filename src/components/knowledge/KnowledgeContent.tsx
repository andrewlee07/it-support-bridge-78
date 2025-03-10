
import React, { useState } from 'react';
import { KnowledgeArticle, KnowledgeCategory } from '@/utils/types/knowledge';
import KnowledgeSidebar from './KnowledgeSidebar';
import KnowledgeArticlesList from './KnowledgeArticlesList';
import KnowledgeArticleDetail from './KnowledgeArticleDetail';
import { Skeleton } from '@/components/ui/skeleton';

interface KnowledgeContentProps {
  articles: KnowledgeArticle[];
  categories: KnowledgeCategory[];
  isLoading: boolean;
  error?: string;
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const KnowledgeContent: React.FC<KnowledgeContentProps> = ({
  articles,
  categories,
  isLoading,
  error,
  selectedCategory,
  onCategorySelect,
  selectedTags,
  onTagSelect
}) => {
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const handleArticleSelect = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  // Extract all unique tags from articles
  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Skeleton className="h-[500px] w-full" />
        </div>
        <div className="md:col-span-3">
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <p className="text-muted-foreground mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <KnowledgeSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelect={onTagSelect}
        />
      </div>
      <div className="md:col-span-3">
        {selectedArticle ? (
          <KnowledgeArticleDetail
            article={selectedArticle}
            onBack={handleBackToList}
            onTagSelect={onTagSelect}
          />
        ) : (
          <KnowledgeArticlesList
            articles={articles}
            onArticleSelect={handleArticleSelect}
          />
        )}
      </div>
    </div>
  );
};

export default KnowledgeContent;
