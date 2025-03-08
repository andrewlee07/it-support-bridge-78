
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Link as LinkIcon, Plus, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { linkTestCaseToBacklogItem, getLinkedBacklogItems } from '@/utils/api/testBacklogIntegrationApi';
import { TestCase } from '@/utils/types/test/testCase';

interface BacklogItemLinkingProps {
  testCaseId: string;
  onBacklogItemsLinked?: () => void;
}

const BacklogItemLinkingSection: React.FC<BacklogItemLinkingProps> = ({ 
  testCaseId,
  onBacklogItemsLinked
}) => {
  const [allBacklogItems, setAllBacklogItems] = useState<BacklogItem[]>([]);
  const [linkedBacklogItems, setLinkedBacklogItems] = useState<BacklogItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLinking, setIsLinking] = useState(false);
  const [selectedBacklogItems, setSelectedBacklogItems] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all backlog items
        const backlogItemsResponse = await fetchBacklogItems();
        if (backlogItemsResponse.data) {
          setAllBacklogItems(backlogItemsResponse.data);
        }
        
        // Fetch linked backlog items
        const linkedItemsResponse = await getLinkedBacklogItems(testCaseId);
        if (linkedItemsResponse.success) {
          setLinkedBacklogItems(linkedItemsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching backlog items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [testCaseId]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleBacklogItemSelection = (backlogItemId: string) => {
    if (selectedBacklogItems.includes(backlogItemId)) {
      setSelectedBacklogItems(selectedBacklogItems.filter(id => id !== backlogItemId));
    } else {
      setSelectedBacklogItems([...selectedBacklogItems, backlogItemId]);
    }
  };
  
  const handleStartLinking = () => {
    setIsLinking(true);
    setSelectedBacklogItems([]);
  };
  
  const handleCancelLinking = () => {
    setIsLinking(false);
    setSelectedBacklogItems([]);
  };
  
  const handleLinkItems = async () => {
    try {
      // Link each selected backlog item to this test case
      for (const backlogItemId of selectedBacklogItems) {
        await linkTestCaseToBacklogItem(testCaseId, backlogItemId);
      }
      
      // Refresh the linked items list
      const linkedItemsResponse = await getLinkedBacklogItems(testCaseId);
      if (linkedItemsResponse.success) {
        setLinkedBacklogItems(linkedItemsResponse.data);
      }
      
      setIsLinking(false);
      setSelectedBacklogItems([]);
      
      if (onBacklogItemsLinked) {
        onBacklogItemsLinked();
      }
    } catch (error) {
      console.error('Error linking backlog items:', error);
    }
  };
  
  // Filter backlog items based on search term
  const filteredBacklogItems = allBacklogItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !linkedBacklogItems.some(linkedItem => linkedItem.id === item.id)
  );
  
  const renderBacklogItem = (item: BacklogItem) => {
    return (
      <div key={item.id} className="flex items-center justify-between border-b py-2 last:border-0">
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{item.title}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Badge variant="outline" className="mr-2 capitalize">{item.status}</Badge>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {item.dueDate ? format(new Date(item.dueDate), 'MMM d, yyyy') : 'No due date'}
            </span>
          </div>
        </div>
        {isLinking && (
          <Button
            variant={selectedBacklogItems.includes(item.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleBacklogItemSelection(item.id)}
          >
            {selectedBacklogItems.includes(item.id) ? 'Selected' : 'Select'}
          </Button>
        )}
      </div>
    );
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Linked Backlog Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full"></div>
            <p className="mt-2 text-muted-foreground">Loading backlog items...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Backlog Items</CardTitle>
        <CardDescription>
          {linkedBacklogItems.length === 0 
            ? "This test case isn't linked to any backlog items yet." 
            : `This test case is linked to ${linkedBacklogItems.length} backlog item${linkedBacklogItems.length !== 1 ? 's' : ''}.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {linkedBacklogItems.length > 0 ? (
          <div className="space-y-2 mb-4">
            {linkedBacklogItems.map(renderBacklogItem)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No linked items</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Link this test case to backlog items to establish traceability.
            </p>
          </div>
        )}
        
        {isLinking ? (
          <>
            <div className="mb-4">
              <Input
                placeholder="Search backlog items..."
                value={searchTerm}
                onChange={handleSearch}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto border rounded-md p-2 mb-4">
              {filteredBacklogItems.length > 0 ? (
                filteredBacklogItems.map(renderBacklogItem)
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  No matching backlog items found
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancelLinking}>Cancel</Button>
              <Button 
                onClick={handleLinkItems} 
                disabled={selectedBacklogItems.length === 0}
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Link Selected Items
              </Button>
            </div>
          </>
        ) : (
          <Button onClick={handleStartLinking}>
            <Plus className="h-4 w-4 mr-2" />
            Link Backlog Items
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BacklogItemLinkingSection;
