
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Search, ClipboardCheck } from 'lucide-react';
import { useDialog } from '@/hooks/useDisclosure';
import KnowledgeArticleForm from './KnowledgeArticleForm';
import { useAuth } from '@/contexts/AuthContext';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { Badge } from '@/components/ui/badge';

interface KnowledgeHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onRefresh: () => void;
  pendingReviewCount?: number;
  onReviewArticlesClick?: () => void;
  selectedArticle?: KnowledgeArticle;
}

const KnowledgeHeader: React.FC<KnowledgeHeaderProps> = ({ 
  onSearch, 
  searchQuery,
  onRefresh,
  pendingReviewCount = 0,
  onReviewArticlesClick,
  selectedArticle
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDialog();
  const { isOpen: isReviewOpen, onOpen: onReviewOpen, onClose: onReviewClose } = useDialog();
  const { userCanPerformAction } = useAuth();

  const isAuthor = userCanPerformAction('knowledge-articles', 'create');
  const isReviewer = userCanPerformAction('knowledge-articles', 'approve');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          {isReviewer && pendingReviewCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReviewArticlesClick}
              className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
            >
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Review Articles
              <Badge variant="secondary" className="ml-2 bg-amber-200 text-amber-800">
                {pendingReviewCount}
              </Badge>
            </Button>
          )}
          
          {isAuthor && (
            <Button 
              size="sm" 
              onClick={onCreateOpen}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          )}
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex w-full max-w-md">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search knowledge base..."
            className="pl-8"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </form>

      {isCreateOpen && (
        <KnowledgeArticleForm
          isOpen={isCreateOpen}
          onClose={onCreateClose}
        />
      )}

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

export default KnowledgeHeader;
