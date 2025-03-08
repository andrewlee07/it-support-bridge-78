
import { useState, useRef, useEffect } from 'react';
import { SearchResult } from '../types';
import { mockSearch } from '../mockData';

export const useSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
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

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    results,
    isLoading,
    selectedFilters,
    toggleFilter,
    clearFilters
  };
};
