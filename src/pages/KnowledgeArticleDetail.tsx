
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getKnowledgeArticleById } from '@/utils/api/knowledgeApi';
import { ChevronLeft, Star, Calendar, Eye, Tag, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import PortalHeader from '@/components/portal/PortalHeader';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

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
          <Card className="p-6 border-gray-200 shadow-sm">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </Card>
        ) : error ? (
          <Card className="p-6 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Error</CardTitle>
              <CardDescription>
                Unable to load the requested knowledge article.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="mt-4">
                <Link to="/portal">Return to Portal</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : article ? (
          <Card className="border-gray-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">{article.title}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">{article.type}</Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Last updated: {format(new Date(article.updatedAt), 'MMM d, yyyy')}
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(Math.random() * 3) + 3 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{article.content}</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-wrap justify-between items-center pt-4 border-t">
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                <span>{article.viewCount} views</span>
              </div>
              
              <div className="flex items-center gap-4">
                <p className="text-sm">Was this article helpful?</p>
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Yes
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  No
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="p-6 border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Article Not Found</CardTitle>
              <CardDescription>
                The requested knowledge article could not be found.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="mt-4">
                <Link to="/portal">Return to Portal</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KnowledgeArticleDetail;
