
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Paperclip, 
  MessageSquare, 
  History, 
  Users, 
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BacklogItemDetailTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  attachmentsCount: number;
  commentsCount: number;
  watchersCount: number;
  isDone: boolean;
}

const BacklogItemDetailTabs = ({ 
  activeTab, 
  setActiveTab,
  attachmentsCount,
  commentsCount,
  watchersCount,
  isDone
}: BacklogItemDetailTabsProps) => {
  return (
    <TabsList className="mb-6 w-full flex flex-wrap justify-start">
      <TabsTrigger 
        value="details" 
        className="flex items-center"
        onClick={() => setActiveTab('details')}
        data-state={activeTab === 'details' ? 'active' : ''}
      >
        <Database className="w-4 h-4 mr-1" />
        Details
      </TabsTrigger>
      
      <TabsTrigger 
        value="attachments" 
        className="flex items-center gap-1"
        onClick={() => setActiveTab('attachments')}
        data-state={activeTab === 'attachments' ? 'active' : ''}
      >
        <Paperclip className="h-4 w-4" />
        Attachments
        {attachmentsCount > 0 && (
          <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
            {attachmentsCount}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="comments" 
        className="flex items-center gap-1"
        onClick={() => setActiveTab('comments')}
        data-state={activeTab === 'comments' ? 'active' : ''}
      >
        <MessageSquare className="h-4 w-4" />
        Comments
        {commentsCount > 0 && (
          <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
            {commentsCount}
          </Badge>
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="history" 
        className="flex items-center"
        onClick={() => setActiveTab('history')}
        data-state={activeTab === 'history' ? 'active' : ''}
      >
        <History className="h-4 w-4 mr-1" />
        History
      </TabsTrigger>
      
      <TabsTrigger 
        value="watchers" 
        className="flex items-center gap-1"
        onClick={() => setActiveTab('watchers')}
        data-state={activeTab === 'watchers' ? 'active' : ''}
      >
        <Users className="h-4 w-4" />
        Watchers
        {watchersCount > 0 && (
          <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
            {watchersCount}
          </Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default BacklogItemDetailTabs;
