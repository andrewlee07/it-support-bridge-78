
import { useState, useEffect } from 'react';

interface UseSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function useSidebar({ onCollapsedChange }: UseSidebarProps = {}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      
      // Auto-collapse on mobile, but ensure sidebar is always visible
      if (newIsMobile) {
        setCollapsed(true);
        if (onCollapsedChange) onCollapsedChange(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onCollapsedChange]);
  
  const toggleCollapsed = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    
    // Notify parent component about the collapse state change
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
  };

  return {
    collapsed,
    isMobile,
    toggleCollapsed
  };
}
