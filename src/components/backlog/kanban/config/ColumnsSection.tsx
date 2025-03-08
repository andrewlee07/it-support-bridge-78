
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { KanbanColumnConfig } from '@/utils/types/kanbanTypes';
import ColumnItem from './ColumnItem';
import AddColumnForm from './AddColumnForm';

interface ColumnsSectionProps {
  columns: KanbanColumnConfig[];
  defaultCollapsed: string[];
  onAddColumn: (displayName: string, statusValue: string) => void;
  onRemoveColumn: (columnId: string) => void;
  onMoveColumn: (columnId: string, direction: 'up' | 'down') => void;
  onToggleVisibility: (columnId: string, isVisible: boolean) => void;
}

const ColumnsSection: React.FC<ColumnsSectionProps> = ({
  columns,
  defaultCollapsed,
  onAddColumn,
  onRemoveColumn,
  onMoveColumn,
  onToggleVisibility
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Columns / Buckets</CardTitle>
          <CardDescription>
            Configure and manage your kanban columns
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {columns.map((column, index) => (
              <ColumnItem
                key={column.id}
                column={column}
                index={index}
                totalColumns={columns.length}
                isCollapsed={defaultCollapsed.includes(column.id)}
                onToggleVisibility={onToggleVisibility}
                onRemoveColumn={onRemoveColumn}
                onMoveColumn={onMoveColumn}
              />
            ))}
          </div>
        </ScrollArea>

        <AddColumnForm onAddColumn={onAddColumn} />
      </CardContent>
    </Card>
  );
};

export default ColumnsSection;
