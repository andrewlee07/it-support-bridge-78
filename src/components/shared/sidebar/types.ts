
import { ReactNode } from 'react';

export interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  collapsed?: boolean;
  items?: NavigationItem[];
}
