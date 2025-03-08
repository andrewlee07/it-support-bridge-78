
import React from 'react';

const SearchFooter: React.FC = () => {
  return (
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
  );
};

export default SearchFooter;
