
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleItemProps {
  title: string;
  rating: number;
  url: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ title, rating, url }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-primary text-primary" />);
    }
    
    // Add empty stars to reach 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 dark:text-gray-600" />);
    }
    
    return stars;
  };

  return (
    <Link to={url} className="block p-3 rounded-md hover:bg-accent transition-colors">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex">
          {renderStars()}
        </div>
      </div>
    </Link>
  );
};

export default ArticleItem;
