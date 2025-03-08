
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { getAllProblems } from '@/utils/mockData/problems';
import ProblemCard from './ProblemCard';
import { Problem, ProblemStatus } from '@/utils/types/problem';

const ProblemList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Get problems from mock data
  const problems = getAllProblems();

  // Filter problems based on search query and filters
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || problem.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || problem.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleProblemClick = (problemId: string) => {
    navigate(`/problems/${problemId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by problem ID or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-1/2"
        />
        <div className="flex gap-4">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="under-investigation">Under Investigation</SelectItem>
              <SelectItem value="root-cause-identified">Root Cause Identified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="known-error">Known Error</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={priorityFilter}
            onValueChange={setPriorityFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="P1">P1 - High</SelectItem>
              <SelectItem value="P2">P2 - Medium</SelectItem>
              <SelectItem value="P3">P3 - Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProblems.length === 0 ? (
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium">No problems found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProblems.map((problem) => (
            <ProblemCard 
              key={problem.id} 
              problem={problem} 
              onClick={() => handleProblemClick(problem.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemList;
