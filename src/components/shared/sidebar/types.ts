
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href?: string;
  path?: string;
  icon: LucideIcon;
  collapsed?: boolean;
  allowedRoles?: string[];
  items?: NavigationItem[];
}

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  allowedRoles?: string[];
}
