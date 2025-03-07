
import React, { useState } from 'react';
import { Bell, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <div className="h-16 px-4 border-b border-border/40 bg-background/80 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!searchActive && (
          <div className="font-semibold text-lg">
            IT Support Bridge
          </div>
        )}
        <div className={`transition-all duration-300 ease-in-out ${searchActive ? 'w-96' : 'w-0 opacity-0 md:w-64 md:opacity-100'}`}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-muted/40 border-none h-9 focus-visible:ring-primary/20"
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="border-b border-border p-4 font-medium">
              Notifications
            </div>
            <div className="p-4 max-h-96 overflow-auto">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm">New ticket assigned to you: <span className="font-medium">"Laptop not starting"</span></p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm">SLA breached for ticket: <span className="font-medium">"Network outage"</span></p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="end">
            <div className="p-4 border-b border-border">
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-muted-foreground">IT Support</div>
            </div>
            <div className="p-2">
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
