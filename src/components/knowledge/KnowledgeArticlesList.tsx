
import React from 'react';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, File, Search, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface KnowledgeArticlesListProps {
  articles: KnowledgeArticle[];
  onArticleSelect: (article: KnowledgeArticle) => void;
}

const KnowledgeArticlesList: React.FC<KnowledgeArticlesListProps> = ({
  articles,
  onArticleSelect
}) => {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No articles found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {articles.length} {articles.length === 1 ? 'Article' : 'Articles'} Found
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-1">{article.title}</CardTitle>
                <Badge>{article.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">
                {article.content.substring(0, 150)}
                {article.content.length > 150 ? '...' : ''}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 3 && (
                  <Badge variant="outline">+{article.tags.length - 3}</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  <span>{article.viewCount} views</span>
                </div>
                <div className="flex items-center">
                  <File className="h-3.5 w-3.5 mr-1" />
                  <span>{article.id}</span>
                </div>
              </div>
              <Button variant="ghost" onClick={() => onArticleSelect(article)}>
                Read <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeArticlesList;
