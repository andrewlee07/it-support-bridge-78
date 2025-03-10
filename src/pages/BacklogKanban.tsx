
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ListIcon } from 'lucide-react';

const BacklogKanban: React.FC = () => {
  const [items, setItems] = useState<BacklogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBacklogItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBacklogItems();
        if (response.success) {
          setItems(response.data);
        }
      } catch (error) {
        console.error('Error loading backlog items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBacklogItems();
  }, []);

  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Backlog Board</h1>
            <p className="text-muted-foreground">Manage your backlog items using the kanban board</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/backlog')}
          >
            <ListIcon className="mr-2 h-4 w-4" />
            List View
          </Button>
        </div>

        <KanbanBoard 
          items={items} 
          isLoading={isLoading} 
          onItemUpdate={(updatedItem) => {
            // Update the items state with the updated item
            setItems(items.map(item => 
              item.id === updatedItem.id ? updatedItem : item
            ));
          }}
        />
      </div>
    </PageTransition>
  );
};

export default BacklogKanban;
