
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKnowledgeArticles, getKnowledgeCategories } from '@/utils/api/knowledgeApi';
import KnowledgeHeader from '@/components/knowledge/KnowledgeHeader';
import KnowledgeContent from '@/components/knowledge/KnowledgeContent';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/useDisclosure';
import KnowledgeArticleForm from '@/components/knowledge/KnowledgeArticleForm';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('published');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | undefined>(undefined);
  
  const { isOpen: isReviewOpen, onOpen: onReviewOpen, onClose: onReviewClose } = useDialog();
  const { userCanPerformAction } = useAuth();
  const isReviewer = userCanPerformAction('knowledge-articles', 'approve');
  const isAuthor = userCanPerformAction('knowledge-articles', 'create');

  const getStatusFilter = () => {
    switch (activeTab) {
      case 'published':
        return 'approved';
      case 'drafts':
        return 'draft';
      case 'pending':
        return 'pending_review';
      case 'rejected':
        return 'rejected';
      default:
        return undefined;
    }
  };

  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    error: articlesError,
    refetch: refetchArticles
  } = useQuery({
    queryKey: ['knowledgeArticles', searchQuery, selectedCategory, selectedTags, activeTab],
    queryFn: () => getKnowledgeArticles(
      searchQuery, 
      selectedCategory || undefined, 
      undefined, 
      selectedTags.length > 0 ? selectedTags : undefined,
      getStatusFilter()
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

  const handleReviewArticle = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
    onReviewOpen();
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const pendingReviewCount = articlesData?.data?.items.filter(
    article => article.status === 'pending_review'
  ).length || 0;

  const allArticles = articlesData?.data?.items || [];
  const filteredArticles = activeTab === 'all' 
    ? allArticles
    : allArticles.filter(article => {
        if (activeTab === 'published') return article.status === 'approved';
        if (activeTab === 'drafts') return article.status === 'draft';
        if (activeTab === 'pending') return article.status === 'pending_review';
        if (activeTab === 'rejected') return article.status === 'rejected';
        return true;
      });

  const categories = categoriesData?.data || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <KnowledgeHeader 
        onSearch={handleSearch} 
        searchQuery={searchQuery}
        onRefresh={handleRefresh}
        pendingReviewCount={pendingReviewCount}
        onReviewArticlesClick={() => setActiveTab('pending')}
        selectedArticle={selectedArticle}
      />
      
      {(isAuthor || isReviewer) && (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
          <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            {isAuthor && <TabsTrigger value="drafts">My Drafts</TabsTrigger>}
            {isReviewer && (
              <TabsTrigger value="pending" className="relative">
                Pending Review
                {pendingReviewCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingReviewCount}
                  </span>
                )}
              </TabsTrigger>
            )}
            {isAuthor && <TabsTrigger value="rejected">Rejected</TabsTrigger>}
          </TabsList>
        </Tabs>
      )}
      
      <div className="mt-6">
        <KnowledgeContent 
          articles={filteredArticles}
          categories={categories}
          isLoading={isLoadingArticles || isLoadingCategories}
          error={articlesError ? 'Failed to load knowledge articles' : undefined}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onReviewArticle={isReviewer ? handleReviewArticle : undefined}
        />
      </div>

      {isReviewOpen && selectedArticle && (
        <KnowledgeArticleForm 
          isOpen={isReviewOpen}
          onClose={onReviewClose}
          articleToEdit={selectedArticle}
          mode="review"
        />
      )}
    </div>
  );
};

export default Knowledge;
