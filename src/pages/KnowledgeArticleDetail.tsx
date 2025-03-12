
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getKnowledgeArticleById } from '@/utils/api/knowledgeApi';
import { ChevronLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PortalHeader from '@/components/portal/PortalHeader';

const KnowledgeArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['knowledgeArticle', id],
    queryFn: () => getKnowledgeArticleById(id || ''),
    enabled: !!id
  });

  const article = data?.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <PortalHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/portal" className="inline-flex items-center text-sm text-primary hover:text-primary/80">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Portal
          </Link>
        </div>
        
        {isLoading ? (
          <Card className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </Card>
        ) : error ? (
          <Card className="p-6">
            <h1 className="text-xl font-medium mb-4">Error</h1>
            <p className="text-muted-foreground">
              Unable to load the requested knowledge article.
            </p>
            <Button asChild className="mt-4">
              <Link to="/portal">Return to Portal</Link>
            </Button>
          </Card>
        ) : article ? (
          <Card className="p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(Math.random() * 3) + 3 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date(article.updatedAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p>{article.content}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Views: {article.viewCount} • Document Type: {article.type}
              </p>
              <p className="text-sm mt-2">
                Was this article helpful?{' '}
                <Button variant="link" className="p-0 h-auto">Yes</Button>{' '}
                <Button variant="link" className="p-0 h-auto">No</Button>
              </p>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <h1 className="text-xl font-medium mb-4">Article Not Found</h1>
            <p className="text-muted-foreground">
              The requested knowledge article could not be found.
            </p>
            <Button asChild className="mt-4">
              <Link to="/portal">Return to Portal</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KnowledgeArticleDetail;
