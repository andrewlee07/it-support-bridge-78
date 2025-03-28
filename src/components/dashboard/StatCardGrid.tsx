
import React from 'react';
import StatCardBox from './StatCardBox';
import { LucideIcon } from 'lucide-react';

interface StatCardItem {
  id: string;
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

interface StatCardGridProps {
  cards: StatCardItem[];
  activeCardIds: string[];
  onCardClick: (cardId: string) => void;
}

const StatCardGrid: React.FC<StatCardGridProps> = ({
  cards,
  activeCardIds,
  onCardClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCardBox
          key={card.id}
          title={card.title}
          value={card.value}
          icon={card.icon}
          iconColor={card.iconColor}
          iconBgColor={card.iconBgColor}
          isActive={activeCardIds.includes(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default StatCardGrid;
