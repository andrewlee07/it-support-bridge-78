
import React from 'react';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { DropResult } from 'react-beautiful-dnd';
import KanbanColumns from './KanbanColumns';
import KanbanEmptyState from './KanbanEmptyState';
import { KanbanBoardConfig } from '@/utils/types/kanbanTypes';
import { ViewDimension } from '@/hooks/backlog/kanban/types';

interface KanbanBoardContentProps {
  backlogItems: BacklogItem[];
  boardConfig: KanbanBoardConfig;
  collapsedColumns: string[];
  toggleColumn: (columnId: string) => void;
  onDragEnd: (result: DropResult) => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
  onAddItem: (status: string) => void;
  getItemsForColumn: (columnStatusValue: string, columnId: string) => BacklogItem[];
  viewDimension: ViewDimension;
  onCreateItem: () => void;
}

const KanbanBoardContent: React.FC<KanbanBoardContentProps> = ({
  backlogItems,
  boardConfig,
  collapsedColumns,
  toggleColumn,
  onDragEnd,
  onEditItem,
  onQuickStatusChange,
  columnSize,
  onAddItem,
  getItemsForColumn,
  viewDimension,
  onCreateItem
}) => {
  if (backlogItems.length === 0) {
    return <KanbanEmptyState onCreateItem={onCreateItem} />;
  }

  return (
    <KanbanColumns
      boardConfig={boardConfig}
      backlogItems={backlogItems}
      collapsedColumns={collapsedColumns}
      toggleColumn={toggleColumn}
      onDragEnd={onDragEnd}
      onEditItem={onEditItem}
      onQuickStatusChange={onQuickStatusChange}
      columnSize={columnSize}
      onAddItem={onAddItem}
      getItemsForColumn={getItemsForColumn}
      viewDimension={viewDimension}
    />
  );
};

export default KanbanBoardContent;
