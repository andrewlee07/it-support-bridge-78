
import { ReactNode } from 'react';

export interface NavigationItem {
  name: string;
  href?: string;
  path?: string;
  icon: React.ElementType;
  collapsed?: boolean;
  allowedRoles?: string[];
  items?: NavigationItem[];
}

export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  title: string;
  href: string;
  allowedRoles?: string[];
}
