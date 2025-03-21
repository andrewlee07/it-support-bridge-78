
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, FileText } from 'lucide-react';

interface ArticleItemProps {
  title: string;
  rating: number;
  url: string;
  description?: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ 
  title, 
  rating, 
  url,
  description
}) => {
  // Get the ID from the URL
  const articleId = url.split('/').pop();
  
  return (
    <Link to={`/knowledge/${articleId}`} className="block">
      <div className="p-3 rounded-md hover:bg-accent transition-colors">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 mt-0.5 text-primary" />
          <div>
            <h4 className="text-sm font-medium mb-1">{title}</h4>
            {description && (
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>
            )}
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-2">{rating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleItem;
