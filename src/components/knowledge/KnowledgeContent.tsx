
import React from 'react';
import { KnowledgeArticle, KnowledgeCategory } from '@/utils/types/knowledge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Tag, FileText, AlertTriangle, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import KnowledgeSidebar from './KnowledgeSidebar';
import { useDialog } from '@/hooks/useDisclosure';
import KnowledgeArticleForm from './KnowledgeArticleForm';
import { useAuth } from '@/contexts/AuthContext';

interface KnowledgeContentProps {
  articles: KnowledgeArticle[];
  categories: KnowledgeCategory[];
  isLoading: boolean;
  error?: string;
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onReviewArticle?: (article: KnowledgeArticle) => void;
}

const KnowledgeContent: React.FC<KnowledgeContentProps> = ({
  articles,
  categories,
  isLoading,
  error,
  selectedCategory,
  onCategorySelect,
  selectedTags,
  onTagSelect,
  onReviewArticle
}) => {
  const { isOpen, onOpen, onClose } = useDialog();
  const [selectedArticle, setSelectedArticle] = React.useState<KnowledgeArticle | undefined>(undefined);
  const { userCanPerformAction, user } = useAuth();

  const isAuthor = userCanPerformAction('knowledge-articles', 'create');
  const isReviewer = userCanPerformAction('knowledge-articles', 'approve');

  const handleEditClick = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
    onOpen();
  };

  const renderStatusBadge = (article: KnowledgeArticle) => {
    switch (article.status) {
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100">Draft</Badge>;
      case 'pending_review':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return null;
    }
  };

  const canEdit = (article: KnowledgeArticle) => {
    if (!isAuthor) return false;
    // Authors can only edit their own articles that are drafts or rejected
    return article.authorId === user?.id && 
      (article.status === 'draft' || article.status === 'rejected');
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading knowledge articles...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <KnowledgeSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col items-center justify-center h-60 border rounded-md p-6 bg-gray-50">
            <FileText className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No articles found</h3>
            <p className="text-gray-500 text-center mt-2">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        </div>
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
          selectedTags={selectedTags}
          onTagSelect={onTagSelect}
          allTags={Array.from(new Set(articles.flatMap(article => article.tags)))}
        />
      </div>
      <div className="md:col-span-3">
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-1">{article.title}</CardTitle>
                    <CardDescription>
                      {article.type} | Last updated: {format(new Date(article.updatedAt), 'MMM d, yyyy')}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStatusBadge(article)}
                    {article.status === 'rejected' && article.reviewComments && (
                      <div className="relative group">
                        <AlertTriangle size={18} className="text-red-500 cursor-help" />
                        <div className="absolute right-0 w-64 p-2 bg-white shadow-lg rounded-md border z-10 hidden group-hover:block">
                          <p className="text-sm font-medium">Review Comments:</p>
                          <p className="text-sm">{article.reviewComments}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="line-clamp-3 text-gray-700" 
                  dangerouslySetInnerHTML={{ __html: article.content }} 
                />
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between items-center pt-2">
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => onTagSelect(tag)}>
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {article.viewCount} views
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {format(new Date(article.createdAt), 'MMM d, yyyy')}
                  </div>
                  
                  <div className="flex space-x-2">
                    {canEdit(article) && (
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(article)}>
                        Edit
                      </Button>
                    )}
                    
                    {isReviewer && article.status === 'pending_review' && onReviewArticle && (
                      <Button size="sm" onClick={() => onReviewArticle(article)}>
                        <ClipboardCheck className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {isOpen && selectedArticle && (
        <KnowledgeArticleForm
          isOpen={isOpen}
          onClose={onClose}
          articleToEdit={selectedArticle}
        />
      )}
    </div>
  );
};

export default KnowledgeContent;
