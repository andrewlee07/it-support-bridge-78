
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'incident' | 'bug' | 'testCase' | 'backlogItem' | 'release' | 'asset' | 'change' | 'task';
  url: string;
  status?: string;
  priority?: string;
  date?: Date;
}

export interface GlobalSearchProps {
  placeholder?: string;
}
