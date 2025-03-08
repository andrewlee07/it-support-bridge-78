
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Command,
  CommandList
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent
} from '@/components/ui/dialog';

import { GlobalSearchProps } from './types';
import { useSearch } from './hooks/useSearch';
import SearchTrigger from './components/SearchTrigger';
import SearchInput from './components/SearchInput';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import SearchFooter from './components/SearchFooter';

const GlobalSearch: React.FC<GlobalSearchProps> = ({ placeholder = "Search across all systems..." }) => {
  const {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    results,
    isLoading,
    selectedFilters,
    toggleFilter,
    clearFilters
  } = useSearch();
  
  const navigate = useNavigate();
  
  const handleSelectResult = (result: any) => {
    navigate(result.url);
    setIsOpen(false);
    setQuery('');
  };
  
  return (
    <>
      <SearchTrigger 
        placeholder={placeholder} 
        onClick={() => setIsOpen(true)} 
      />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-3xl overflow-hidden">
          <Command className="rounded-lg border shadow-md">
            <SearchInput 
              query={query} 
              setQuery={setQuery} 
            />
            
            <SearchFilters 
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
            />
            
            <SearchResults 
              results={results}
              isLoading={isLoading}
              query={query}
              onSelectResult={handleSelectResult}
            />
            
            <SearchFooter />
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalSearch;
