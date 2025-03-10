
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Search } from 'lucide-react';
import { useDialog } from '@/hooks/useDisclosure';
import KnowledgeArticleForm from './KnowledgeArticleForm';

interface KnowledgeHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onRefresh: () => void;
}

const KnowledgeHeader: React.FC<KnowledgeHeaderProps> = ({ 
  onSearch, 
  searchQuery,
  onRefresh 
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const { isOpen, onOpen, onClose } = useDialog();

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
          <Button 
            size="sm" 
            onClick={onOpen}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
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

      {isOpen && (
        <KnowledgeArticleForm
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default KnowledgeHeader;
