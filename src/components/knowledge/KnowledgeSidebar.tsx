
import React from 'react';
import { KnowledgeCategory } from '@/utils/types/knowledge';
import { Button } from '@/components/ui/button';
import { BookOpen, Tag, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface KnowledgeSidebarProps {
  categories: KnowledgeCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const KnowledgeSidebar: React.FC<KnowledgeSidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  tags,
  selectedTags,
  onTagSelect
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          Categories
        </h3>
        <div className="space-y-1">
          <Button
            variant={selectedCategory === null ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onCategorySelect(null)}
          >
            All Articles
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategorySelect(category.name)}
            >
              {category.name}
              <Badge variant="outline" className="ml-auto">
                {category.articleCount}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedTags.map(tag => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => onTagSelect(tag)}
            >
              {tag}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs" 
            onClick={() => selectedTags.forEach(tag => onTagSelect(tag))}
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-medium flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 15).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "secondary" : "outline"}
              className={cn(
                "cursor-pointer hover:bg-secondary hover:text-secondary-foreground",
                selectedTags.includes(tag) && "bg-secondary text-secondary-foreground"
              )}
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSidebar;
