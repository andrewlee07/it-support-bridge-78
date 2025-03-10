
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKnowledgeArticles, getKnowledgeCategories } from '@/utils/api/knowledgeApi';
import KnowledgeHeader from '@/components/knowledge/KnowledgeHeader';
import KnowledgeContent from '@/components/knowledge/KnowledgeContent';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { toast } from 'sonner';

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    error: articlesError,
    refetch: refetchArticles
  } = useQuery({
    queryKey: ['knowledgeArticles', searchQuery, selectedCategory, selectedTags],
    queryFn: () => getKnowledgeArticles(
      searchQuery, 
      selectedCategory || undefined, 
      undefined, 
      selectedTags.length > 0 ? selectedTags : undefined
    )
  });

  const {
    data: categoriesData,
    isLoading: isLoadingCategories
  } = useQuery({
    queryKey: ['knowledgeCategories'],
    queryFn: getKnowledgeCategories
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRefresh = () => {
    refetchArticles();
    toast.success('Knowledge base refreshed');
  };

  const articles = articlesData?.data?.items || [];
  const categories = categoriesData?.data || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <KnowledgeHeader 
        onSearch={handleSearch} 
        searchQuery={searchQuery}
        onRefresh={handleRefresh}
      />
      
      <div className="mt-6">
        <KnowledgeContent 
          articles={articles}
          categories={categories}
          isLoading={isLoadingArticles || isLoadingCategories}
          error={articlesError ? 'Failed to load knowledge articles' : undefined}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      </div>
    </div>
  );
};

export default Knowledge;
