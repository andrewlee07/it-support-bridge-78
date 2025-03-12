
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

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
  return (
    <Link to={url} className="block">
      <div className="p-3 rounded-md hover:bg-accent transition-colors">
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
    </Link>
  );
};

export default ArticleItem;
