
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, StarOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { WatchableItem, WatchableItemType, useWatchList } from '@/hooks/useWatchList';

interface WatchButtonProps {
  item: {
    id: string;
    type: WatchableItemType;
    title: string;
    status: string;
    createdAt: Date;
    updatedAt?: Date;
  };
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const WatchButton: React.FC<WatchButtonProps> = ({ 
  item,
  variant = 'ghost',
  size = 'icon'
}) => {
  const { isWatched, toggleWatchItem } = useWatchList();
  const isActive = isWatched(item.id, item.type);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWatchItem(item as WatchableItem);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={handleClick}
            className={isActive ? 'text-yellow-500 hover:text-yellow-600' : ''}
            aria-label={isActive ? "Remove from watch list" : "Add to watch list"}
          >
            {isActive ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isActive ? "Remove from watch list" : "Add to watch list"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WatchButton;
