
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  Eye, 
  FileText,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getKnowledgeArticlesForService } from '@/utils/mockData/knowledgeArticles';
import { getUserById } from '@/utils/mockData/users';
import { Badge } from '@/components/ui/badge';

interface ServiceKnowledgeArticlesProps {
  serviceId: string;
}

const ServiceKnowledgeArticles: React.FC<ServiceKnowledgeArticlesProps> = ({ serviceId }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const allKnowledgeArticles = getKnowledgeArticlesForService(serviceId);
  
  const filteredArticles = activeTab === 'all' 
    ? allKnowledgeArticles 
    : allKnowledgeArticles.filter(article => article.relationshipType === activeTab);
  
  // Sort articles by view count (most viewed first)
  const sortedArticles = [...filteredArticles].sort((a, b) => b.viewCount - a.viewCount);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Documentation':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Known Issue':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'FAQ':
        return <HelpCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };
  
  if (allKnowledgeArticles.length === 0) {
    return (
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Book className="h-5 w-5" />
            Knowledge Articles
          </CardTitle>
          <CardDescription>
            Documentation, known issues, and FAQs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm italic">
            No knowledge articles associated with this service.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Book className="h-5 w-5" />
          Knowledge Articles
        </CardTitle>
        <CardDescription>
          Documentation, known issues, and FAQs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Documentation">Documentation</TabsTrigger>
            <TabsTrigger value="Known Issue">Known Issues</TabsTrigger>
            <TabsTrigger value="FAQ">FAQs</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {sortedArticles.length === 0 ? (
              <div className="text-muted-foreground text-sm italic">
                No articles found for this category.
              </div>
            ) : (
              sortedArticles.map(article => {
                const author = getUserById(article.authorId);
                
                return (
                  <div key={article.id} className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        {getTypeIcon(article.relationshipType)}
                        <div>
                          <h3 className="font-medium text-md">{article.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {article.content.length > 150 
                              ? `${article.content.substring(0, 150)}...` 
                              : article.content}
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        {author && <span>By: {author.name}</span>}
                        <span>Last updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{article.viewCount}</span>
                      </div>
                    </div>
                    
                    {article.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {article.tags.map(tag => (
                          <Badge
                            key={tag} 
                            variant="outline"
                            className="text-xs flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceKnowledgeArticles;
