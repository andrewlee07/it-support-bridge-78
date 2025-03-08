import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, LinkIcon } from 'lucide-react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { TestCase } from '@/utils/types/test/testCase';
import { useQuery } from '@tanstack/react-query';
import { 
  getBacklogItemsAffectedByBug, 
  getBacklogItemCoverage 
} from '@/utils/api/testBacklogIntegrationApi';
import { fetchBacklogItems } from '@/utils/api/backlogApi';

export interface BacklogItemLinkingProps {
  testCaseId: string;
  testCase?: TestCase;
  onLinkBacklogItem?: () => void;
}

const BacklogItemLinkingSection: React.FC<BacklogItemLinkingProps> = ({ 
  testCaseId,
  testCase,
  onLinkBacklogItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedItems, setDisplayedItems] = useState<BacklogItem[]>([]);
  
  // Fetch backlog items that could be linked
  const { data: backlogItemsResponse, isLoading: isLoadingBacklogItems } = useQuery({
    queryKey: ['backlogItems'],
    queryFn: () => fetchBacklogItems()
  });
  
  // Get linked backlog items
  const { data: linkedBacklogData, isLoading: isLoadingLinkedItems } = useQuery({
    queryKey: ['linkedBacklogItems', testCaseId],
    queryFn: async () => {
      // If testCase has relatedBacklogItemIds, use that data
      if (testCase?.relatedBacklogItemIds) {
        const items = (backlogItemsResponse?.data || [])
          .filter(item => testCase.relatedBacklogItemIds?.includes(item.id));
        return { success: true, data: items };
      }
      
      // Otherwise fetch all backlog items and filter later
      return { success: true, data: [] };
    },
    enabled: !!testCaseId
  });
  
  const linkedBacklogItems = linkedBacklogData?.data || [];
  
  // Filter backlog items based on search
  useEffect(() => {
    if (backlogItemsResponse?.data) {
      let items = [...backlogItemsResponse.data];
      
      // Filter out already linked items
      const linkedIds = linkedBacklogItems.map(item => item.id);
      items = items.filter(item => !linkedIds.includes(item.id));
      
      // Apply search filter if there is a query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        items = items.filter(
          item => 
            item.title.toLowerCase().includes(query) || 
            (item.description && item.description.toLowerCase().includes(query))
        );
      }
      
      // Limit to top 5 results
      setDisplayedItems(items.slice(0, 5));
    }
  }, [searchQuery, backlogItemsResponse?.data, linkedBacklogItems]);
  
  // Handle linking a backlog item
  const handleLinkBacklogItem = async (backlogItemId: string) => {
    // Implementation would call API to link the test case to backlog item
    console.log(`Linking test case ${testCaseId} to backlog item ${backlogItemId}`);
    
    // Trigger refetch or update callback
    if (onLinkBacklogItem) {
      onLinkBacklogItem();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <LinkIcon className="h-5 w-5" /> 
          Backlog Item Linking
        </CardTitle>
        <CardDescription>
          Link this test case to backlog items for traceability
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search input */}
        <div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search backlog items..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        {/* Linked backlog items */}
        <div>
          <h4 className="text-sm font-medium mb-2">Linked Backlog Items</h4>
          {isLoadingLinkedItems ? (
            <div className="animate-pulse p-4 rounded-lg border">Loading...</div>
          ) : linkedBacklogItems.length === 0 ? (
            <div className="text-sm text-muted-foreground border rounded-lg p-4 text-center">
              No backlog items linked to this test case
            </div>
          ) : (
            <div className="space-y-2">
              {linkedBacklogItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 text-sm">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-muted-foreground text-xs mt-1">
                    {item.type} · {item.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Available backlog items to link */}
        {searchQuery || displayedItems.length > 0 ? (
          <div>
            <h4 className="text-sm font-medium mb-2">Available Items</h4>
            {isLoadingBacklogItems ? (
              <div className="animate-pulse p-4 rounded-lg border">Loading...</div>
            ) : displayedItems.length === 0 ? (
              <div className="text-sm text-muted-foreground border rounded-lg p-4 text-center">
                No matching backlog items found
              </div>
            ) : (
              <div className="space-y-2">
                {displayedItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 text-sm flex justify-between items-center">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {item.type} · {item.status}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleLinkBacklogItem(item.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Link
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default BacklogItemLinkingSection;
