
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKnowledgeArticlesByService } from '@/utils/api/knowledgeApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { Button } from '@/components/ui/button';

interface KnowledgeArticlesByServiceProps {
  serviceId: string;
  serviceName: string;
}

const KnowledgeArticlesByService: React.FC<KnowledgeArticlesByServiceProps> = ({
  serviceId,
  serviceName
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['knowledgeArticlesByService', serviceId],
    queryFn: () => getKnowledgeArticlesByService(serviceId),
    enabled: !!serviceId
  });

  if (isLoading) {
    return <div className="py-4">Loading knowledge articles...</div>;
  }

  if (error) {
    return <div className="py-4 text-red-500">Failed to load knowledge articles</div>;
  }

  const articles = data?.data || [];

  if (articles.length === 0) {
    return (
      <div className="py-4">
        <Card className="bg-gray-50">
          <CardContent className="pt-6 flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">No knowledge articles</h3>
            <p className="text-gray-500 text-center mt-1">
              There are no knowledge articles available for this service.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderArticleCard = (article: KnowledgeArticle) => (
    <Card key={article.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{article.title}</CardTitle>
        <CardDescription>
          {article.type} | Last updated: {format(new Date(article.updatedAt), 'MMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-700 line-clamp-2 mb-2" 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        <div className="flex flex-wrap gap-1 mt-2">
          {article.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Knowledge Articles for {serviceName}</h3>
        <Button variant="outline" size="sm" onClick={() => window.open('/knowledge', '_blank')}>
          View All Articles
        </Button>
      </div>
      <div>
        {articles.map(renderArticleCard)}
      </div>
    </div>
  );
};

export default KnowledgeArticlesByService;
