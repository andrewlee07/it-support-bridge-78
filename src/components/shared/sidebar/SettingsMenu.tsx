
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsMenuProps {
  collapsed: boolean;
  hasPermission: (allowedRoles: string[]) => boolean;
  locationPathname: string;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  collapsed, 
  hasPermission,
  locationPathname 
}) => {
  // This component is no longer used as we've moved admin items to navigationItems
  return null;
};

export default SettingsMenu;
