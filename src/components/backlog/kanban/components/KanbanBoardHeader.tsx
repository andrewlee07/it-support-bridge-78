import React from 'react';

interface KanbanBoardHeaderProps {
  onConfigOpen: () => void;
  onCreateItem: () => void;
}

const KanbanBoardHeader: React.FC<KanbanBoardHeaderProps> = ({
  onConfigOpen,
  onCreateItem
}) => {
  return (
    <div className="flex justify-end mb-4">
      {/* Removed Configure Board button as it's now in the BacklogKanbanHeader */}
    </div>
  );
};

export default KanbanBoardHeader;
