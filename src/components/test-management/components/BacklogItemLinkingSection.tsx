
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link2, Plus } from 'lucide-react';
import { TestCase } from '@/utils/types/test/testCase';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { getLinkedTestCases } from '@/utils/api/testBacklogIntegrationApi';

interface BacklogItemLinkingSectionProps {
  testCase: TestCase;
  onLinkBacklogItem?: () => void;
}

const BacklogItemLinkingSection: React.FC<BacklogItemLinkingSectionProps> = ({ 
  testCase,
  onLinkBacklogItem 
}) => {
  // Fetch linked backlog items
  const { data, isLoading } = useQuery({
    queryKey: ['backlogItems', 'linked', testCase.id],
    queryFn: async () => {
      const response = await getLinkedTestCases(testCase.id);
      return response.data || [];
    },
  });

  const linkedBacklogItems = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Linked Backlog Items</h3>
        {onLinkBacklogItem && (
          <Button variant="outline" size="sm" onClick={onLinkBacklogItem}>
            <Plus className="h-4 w-4 mr-2" />
            Link Backlog Item
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="py-10 text-center">Loading linked items...</div>
      ) : linkedBacklogItems.length === 0 ? (
        <div className="border rounded-md p-8 text-center">
          <Link2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No linked backlog items</h3>
          <p className="text-muted-foreground mb-4">
            Link this test case to backlog items to track test coverage.
          </p>
          {onLinkBacklogItem && (
            <Button variant="outline" onClick={onLinkBacklogItem}>
              <Plus className="h-4 w-4 mr-2" />
              Link Backlog Item
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {linkedBacklogItems.map((item: BacklogItem) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.id.substring(0, 8)}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BacklogItemLinkingSection;
