
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTraceabilityMatrix } from '@/utils/api/testBacklogIntegrationApi';
import { TraceabilityMatrix as TraceabilityMatrixType } from '@/utils/types/test/testCoverage';
import StatusBadge from '../ui/StatusBadge';
import TestCoverageIndicator from '@/components/backlog/TestCoverageIndicator';

const TraceabilityMatrix: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch traceability matrix data
  const { data, isLoading } = useQuery({
    queryKey: ['traceabilityMatrix'],
    queryFn: async () => {
      const response = await getTraceabilityMatrix();
      return response.data as TraceabilityMatrixType;
    }
  });

  // Filter the data based on search term and status
  const filteredData = data?.backlogItems.filter(item => {
    const matchesSearch = filter === '' || 
      item.title.toLowerCase().includes(filter.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      item.testCases.some(tc => tc.status === statusFilter);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Traceability Matrix</CardTitle>
        <CardDescription>
          Track which backlog items are covered by which test cases
        </CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Input
            placeholder="Search backlog items..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="sm:max-w-sm"
          />
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="sm:max-w-xs">
              <SelectValue placeholder="Filter by test status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pass">Passed</SelectItem>
              <SelectItem value="fail">Failed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="not-run">Not Run</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading traceability data...</div>
        ) : !filteredData || filteredData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No matching backlog items found.
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Backlog Item</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Test Cases</TableHead>
                  <TableHead>Bugs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.title}
                    </TableCell>
                    <TableCell>
                      <TestCoverageIndicator 
                        coveragePercentage={item.coverage} 
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.testCases.map(tc => (
                          <div key={tc.id} className="text-xs border rounded px-2 py-1 inline-flex items-center">
                            <StatusBadge status={tc.status} size="xs" />
                            <span className="ml-1">{tc.title.substring(0, 20)}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.bugs.map(bug => (
                          <div key={bug.id} className="text-xs bg-red-50 text-red-800 border rounded px-2 py-1">
                            {bug.title.substring(0, 20)}
                          </div>
                        ))}
                        {item.bugs.length === 0 && (
                          <span className="text-muted-foreground">No bugs</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TraceabilityMatrix;
