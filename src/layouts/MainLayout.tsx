
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import { cn } from '@/lib/utils';

const MainLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check for user's dark mode preference from localStorage or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newMode;
    });
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <Sidebar />
      
      <div className="pl-16 md:pl-64 min-h-screen">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        
        <main className={cn(
          "px-4 py-6 md:px-6 md:py-8 min-h-[calc(100vh-4rem)]",
          "transition-all duration-300 ease-in-out"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
