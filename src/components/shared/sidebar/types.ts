
import { ReactNode } from 'react';

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
  items?: NavigationItem[];
  description?: string;
  path?: string;
  name?: string;
  collapsed?: boolean;
  allowedRoles?: string[];
}

export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  title: string;
  href: string;
  allowedRoles?: string[];
}
