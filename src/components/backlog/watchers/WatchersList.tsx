
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Plus, X } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { User } from '@/utils/types/user';
import { getUserById } from '@/utils/mockData/users';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface WatchersListProps {
  watcherIds: string[];
  onToggleWatch: (isWatching: boolean) => void;
  onAddWatcher: (userId: string) => void;
  onRemoveWatcher: (userId: string) => void;
  isCurrentUserWatching: boolean;
  availableUsers: User[]; // Updated to explicitly use User type
}

const WatchersList: React.FC<WatchersListProps> = ({
  watcherIds,
  onToggleWatch,
  onAddWatcher,
  onRemoveWatcher,
  isCurrentUserWatching,
  availableUsers
}) => {
  // Get the users from watchers IDs and ensure they're compatible with User type
  const watchers = watcherIds
    .map(id => getUserById(id))
    .filter((user): user is User => user !== undefined); // Fixed type predicate
  
  // Only show users that aren't already watchers
  const nonWatchingUsers = availableUsers.filter(
    user => !watcherIds.includes(user.id)
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Watchers ({watchers.length})</h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggleWatch(!isCurrentUserWatching)}
        >
          {isCurrentUserWatching ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Unwatch
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Watch
            </>
          )}
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {watchers.length > 0 ? (
          watchers.map(watcher => (
            <div 
              key={watcher.id}
              className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs"
            >
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[10px]">
                  {watcher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span>{watcher.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1"
                onClick={() => onRemoveWatcher(watcher.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-xs text-muted-foreground">
            No watchers yet
          </div>
        )}
        
        {nonWatchingUsers.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                <Plus className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0" align="start">
              <div className="p-2 font-medium text-sm border-b">
                Add watchers
              </div>
              <ScrollArea className="max-h-72">
                {nonWatchingUsers.map(user => (
                  <button
                    key={user.id}
                    className={cn(
                      "flex items-center gap-2 w-full p-2 text-sm text-left",
                      "hover:bg-muted/50 transition-colors"
                    )}
                    onClick={() => onAddWatcher(user.id)}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </button>
                ))}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default WatchersList;
