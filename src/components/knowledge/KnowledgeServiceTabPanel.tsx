
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKnowledgeArticlesByService } from '@/utils/api/knowledgeApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface KnowledgeServiceTabPanelProps {
  serviceId: string;
}

const KnowledgeServiceTabPanel: React.FC<KnowledgeServiceTabPanelProps> = ({ serviceId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['knowledgeArticlesForService', serviceId],
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
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Knowledge Articles
        </h3>
        <Button size="sm" variant="outline" onClick={() => window.open('/knowledge', '_blank')}>
          View All Articles
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map(article => (
          <Card key={article.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription>
                {article.type} | Last updated: {format(new Date(article.updatedAt), 'MMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="line-clamp-2 text-sm text-gray-700" 
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex flex-wrap gap-1">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeServiceTabPanel;
