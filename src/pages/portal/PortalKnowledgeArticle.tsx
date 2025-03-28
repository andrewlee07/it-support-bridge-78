
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { PORTAL } from '@/utils/routes/portalRouteConstants';
import PageTransition from '@/components/shared/PageTransition';
import { useKnowledgeArticle } from '@/hooks/useKnowledgeArticle';
import { cn } from '@/lib/utils';

const PortalKnowledgeArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { article, loading, error } = useKnowledgeArticle(id || '');
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading knowledge article...</p>
        </div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Article Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The knowledge article you're looking for could not be found or you don't have permission to view it.
        </p>
        <Link to={PORTAL}>
          <Button>Return to Portal</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <div className="mb-6">
        <Link to={PORTAL} className="inline-flex items-center text-sm text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Portal
        </Link>
      </div>
      
      <Card className="overflow-hidden border-0 shadow-md">
        <CardHeader className="bg-primary-50 dark:bg-primary-900/20 pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={cn(
                      "h-4 w-4", 
                      star <= (article.rating || 0) 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-gray-300"
                    )} 
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-2">
                  {article.rating}/5 ({article.ratingCount || 0} ratings)
                </span>
              </div>
            </div>
            <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
            
            <div className="text-sm text-muted-foreground flex items-center">
              <span>Last updated: {article.updatedAt 
                ? formatDistanceToNow(new Date(article.updatedAt)) + ' ago'
                : 'Unknown'
              }</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Metadata</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted-foreground">Category:</dt>
                  <dd>{article.category}</dd>
                  
                  <dt className="text-muted-foreground">Keywords:</dt>
                  <dd>{article.keywords?.join(', ') || 'None'}</dd>
                  
                  <dt className="text-muted-foreground">Author:</dt>
                  <dd>{article.author || 'System'}</dd>
                </dl>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Related Articles</h3>
                {article.relatedArticles && article.relatedArticles.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {article.relatedArticles.map((relatedArticle, index) => (
                      <li key={index}>
                        <Link 
                          to={`/portal/knowledge/${relatedArticle.id}`}
                          className="text-primary hover:underline"
                        >
                          {relatedArticle.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No related articles.</p>
                )}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-sm font-medium mb-4">Was this article helpful?</h3>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  );
};

export default PortalKnowledgeArticle;
