
import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import GlobalSearch from '@/components/shared/search/GlobalSearch';
import NotificationCenter from '@/components/shared/notifications/NotificationCenter';

interface NavbarProps {
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    if (toggleDarkMode) {
      toggleDarkMode();
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container max-w-7xl">
        <div className="ml-auto flex items-center space-x-4">
          <GlobalSearch />
          
          <NotificationCenter />
          
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-2"
            onClick={handleThemeToggle}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
