
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  Bug, 
  ClipboardList, 
  FileText, 
  Package, 
  Search, 
  X, 
  Box, 
  SortAsc, 
  Calendar
} from 'lucide-react';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'incident' | 'bug' | 'testCase' | 'backlogItem' | 'release' | 'asset' | 'change';
  url: string;
  status?: string;
  priority?: string;
  date?: Date;
}

// This would come from a real API in a production app
const mockSearch = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 2) return [];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const results: SearchResult[] = [
    {
      id: 'incident-1',
      title: 'Network outage in data center',
      description: 'Major incident affecting all services',
      type: 'incident',
      url: '/incidents/incident-1',
      status: 'active',
      priority: 'critical',
      date: new Date()
    },
    {
      id: 'bug-1',
      title: 'Login form validation fails',
      description: 'Users cannot log in when using special characters',
      type: 'bug',
      url: '/bugs/bug-1',
      status: 'open',
      priority: 'high'
    },
    {
      id: 'test-1',
      title: 'User registration test',
      description: 'Verifies the user registration flow',
      type: 'testCase',
      url: '/test-tracking/test-1',
      status: 'passed'
    },
    {
      id: 'backlog-1',
      title: 'Implement password reset feature',
      description: 'Allow users to reset their passwords via email',
      type: 'backlogItem',
      url: '/backlog/backlog-1',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 'release-1',
      title: 'Version 2.0 Release',
      description: 'Major release with new features',
      type: 'release',
      url: '/releases/release-1',
      status: 'planned',
      date: new Date(Date.now() + 86400000 * 14) // 14 days in the future
    },
    {
      id: 'asset-1',
      title: 'Primary Database Server',
      description: 'Main production database',
      type: 'asset',
      url: '/assets/asset-1',
      status: 'active'
    }
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );
  
  return results;
};

const getIconForResultType = (type: string) => {
  switch (type) {
    case 'incident':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case 'bug':
      return <Bug className="h-4 w-4 text-red-500" />;
    case 'testCase':
      return <FileText className="h-4 w-4 text-purple-500" />;
    case 'backlogItem':
      return <ClipboardList className="h-4 w-4 text-orange-500" />;
    case 'release':
      return <Package className="h-4 w-4 text-green-500" />;
    case 'asset':
      return <Box className="h-4 w-4 text-blue-500" />;
    case 'change':
      return <Calendar className="h-4 w-4 text-cyan-500" />;
    default:
      return <Search className="h-4 w-4" />;
  }
};

interface GlobalSearchProps {
  placeholder?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ 
  placeholder = "Search across all systems..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    
    const performSearch = async () => {
      setIsLoading(true);
      try {
        const searchResults = await mockSearch(query);
        
        // Apply filters if any are selected
        const filteredResults = selectedFilters.length > 0
          ? searchResults.filter(result => selectedFilters.includes(result.type))
          : searchResults;
          
        setResults(filteredResults);
      } catch (error) {
        console.error("Search failed", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce search to avoid too many API calls
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(performSearch, 300);
    
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query, selectedFilters]);
  
  const handleSelectResult = (result: SearchResult) => {
    navigate(result.url);
    setIsOpen(false);
    setQuery('');
  };
  
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const clearFilters = () => {
    setSelectedFilters([]);
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        className="w-full justify-between"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4" />
          <span>{placeholder}</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-3xl overflow-hidden">
          <Command className="rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search across all systems..."
                value={query}
                onValueChange={setQuery}
                className="flex-1 border-0 outline-none focus:ring-0"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuery('')}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Filter bar */}
            <div className="border-b px-3 py-2">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Filter by:</span>
                {[
                  { label: 'Incidents', value: 'incident' },
                  { label: 'Bugs', value: 'bug' },
                  { label: 'Tests', value: 'testCase' },
                  { label: 'Backlog', value: 'backlogItem' },
                  { label: 'Releases', value: 'release' },
                  { label: 'Assets', value: 'asset' },
                  { label: 'Changes', value: 'change' }
                ].map(filter => (
                  <Badge 
                    key={filter.value}
                    variant={selectedFilters.includes(filter.value) ? "default" : "outline"}
                    onClick={() => toggleFilter(filter.value)}
                    className="cursor-pointer"
                  >
                    {filter.label}
                  </Badge>
                ))}
                
                {selectedFilters.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-6 px-2"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            
            <CommandList>
              {isLoading ? (
                <div className="py-6 text-center">
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Searching...</p>
                </div>
              ) : results.length === 0 ? (
                <CommandEmpty>
                  {query.length < 2 
                    ? "Type at least 2 characters to search" 
                    : "No results found"}
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {results.map((result) => (
                    <CommandItem
                      key={`${result.type}-${result.id}`}
                      onSelect={() => handleSelectResult(result)}
                      className="py-2"
                    >
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          {getIconForResultType(result.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{result.title}</div>
                          {result.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {result.description}
                            </p>
                          )}
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs text-muted-foreground capitalize">
                              {result.type.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            {result.status && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-muted">
                                {result.status}
                              </span>
                            )}
                            {result.priority && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-muted">
                                {result.priority}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
            
            <div className="border-t px-3 py-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <div>
                  Press <kbd className="rounded border bg-muted px-1">↑</kbd> <kbd className="rounded border bg-muted px-1">↓</kbd> to navigate
                </div>
                <div>
                  Press <kbd className="rounded border bg-muted px-1">Enter</kbd> to select
                </div>
              </div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalSearch;
