
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import ArticleItem from './ArticleItem';
import { Card } from '@/components/ui/card';

// This would be replaced with an actual API call in a real application
const fetchPublishedArticles = async (): Promise<KnowledgeArticle[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return [
    {
      id: '1',
      title: 'Getting Around in Windows',
      content: 'This guide shows how to navigate Windows 11 efficiently.',
      type: 'Guide',
      tags: ['windows', 'navigation'],
      authorId: 'user-1',
      viewCount: 1250,
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2023-11-20'),
      status: 'approved',
      reviewerId: 'user-2',
      reviewDate: new Date('2023-11-19')
    },
    {
      id: '2',
      title: 'How to configure VPN for Apple Devices',
      content: 'Step-by-step guide for setting up VPN on macOS and iOS devices.',
      type: 'Guide',
      tags: ['apple', 'vpn', 'security'],
      authorId: 'user-3',
      viewCount: 980,
      createdAt: new Date('2023-09-05'),
      updatedAt: new Date('2023-11-10'),
      status: 'approved',
      reviewerId: 'user-2',
      reviewDate: new Date('2023-11-09')
    },
    {
      id: '3',
      title: 'Troubleshooting Network Connectivity Issues',
      content: 'Common solutions for network problems in the office environment.',
      type: 'Known Issue',
      tags: ['network', 'troubleshooting'],
      authorId: 'user-2',
      viewCount: 1500,
      createdAt: new Date('2023-08-20'),
      updatedAt: new Date('2023-10-15'),
      status: 'approved',
      reviewerId: 'user-1',
      reviewDate: new Date('2023-10-14')
    },
    {
      id: '4',
      title: 'Using Microsoft Teams Effectively',
      content: 'Best practices for communication and collaboration in Microsoft Teams.',
      type: 'Guide',
      tags: ['teams', 'communication', 'microsoft'],
      authorId: 'user-3',
      viewCount: 2100,
      createdAt: new Date('2023-07-12'),
      updatedAt: new Date('2023-09-30'),
      status: 'approved',
      reviewerId: 'user-2',
      reviewDate: new Date('2023-09-29')
    }
  ];
};

interface KnowledgeArticlesListProps {
  maxItems?: number;
  showHeader?: boolean;
  className?: string;
}

const KnowledgeArticlesList: React.FC<KnowledgeArticlesListProps> = ({ 
  maxItems = 4,
  showHeader = true,
  className = ''
}) => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['publishedKnowledgeArticles'],
    queryFn: fetchPublishedArticles
  });

  if (isLoading) {
    return (
      <Card className={`p-5 ${className}`}>
        {showHeader && <h3 className="text-lg font-medium mb-4">Knowledge Articles</h3>}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error || !articles) {
    return (
      <Card className={`p-5 ${className}`}>
        {showHeader && <h3 className="text-lg font-medium mb-4">Knowledge Articles</h3>}
        <div className="text-sm text-muted-foreground">
          Unable to load knowledge articles.
        </div>
      </Card>
    );
  }

  const displayedArticles = articles.slice(0, maxItems);

  return (
    <Card className={`p-5 ${className}`}>
      {showHeader && <h3 className="text-lg font-medium mb-4">Knowledge Articles</h3>}
      <div className="space-y-4">
        {displayedArticles.map(article => (
          <ArticleItem
            key={article.id}
            title={article.title}
            description={article.content.substring(0, 120) + '...'}
            rating={Math.floor(Math.random() * 3) + 3} // Simulate rating between 3-5
            url={`/knowledge/${article.id}`}
          />
        ))}
      </div>
      {articles.length > maxItems && (
        <a href="/knowledge" className="text-sm text-primary hover:text-primary/80 block mt-4">
          View all articles ({articles.length})
        </a>
      )}
    </Card>
  );
};

export default KnowledgeArticlesList;
