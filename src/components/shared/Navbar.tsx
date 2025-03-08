
import React, { useState } from 'react';
import { Moon, Search, Settings, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import NotificationCenter from './notifications/NotificationCenter';
import GlobalSearch from './search/GlobalSearch';

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [searchActive, setSearchActive] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Get the first letter of each name part for the avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Convert role to display format
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'it':
        return 'IT Support';
      case 'user':
        return 'End User';
      default:
        return role;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
            <GlobalSearch placeholder="Search across all systems..." />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <NotificationCenter />
        
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <div className="p-4 border-b border-border">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{getRoleDisplay(user.role)}</div>
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
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
