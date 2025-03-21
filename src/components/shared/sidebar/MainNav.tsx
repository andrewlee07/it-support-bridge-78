
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/utils/types/configuration';

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    label: 'Dashboard'
  },
  {
    title: 'Incidents',
    href: '/incidents',
    label: 'Incidents'
  },
  {
    title: 'Service Requests',
    href: '/service-requests',
    label: 'Service Requests'
  },
  {
    title: 'Security Cases',
    href: '/security-cases',
    label: 'Security'
  },
  {
    title: 'Problems',
    href: '/problems',
    label: 'Problems'
  },
  {
    title: 'Changes',
    href: '/changes',
    label: 'Changes'
  },
  {
    title: 'Releases',
    href: '/releases',
    label: 'Releases'
  },
  {
    title: 'Assets',
    href: '/assets',
    label: 'Assets'
  },
  {
    title: 'Announcements',
    href: '/announcements',
    label: 'Announcements'
  },
  {
    title: 'Knowledge Base',
    href: '/knowledge',
    label: 'Knowledge'
  },
  {
    title: 'Testing',
    href: '/testing',
    label: 'Testing'
  },
  {
    title: 'Administration',
    href: '/admin',
    label: 'Administration'
  }
];

const MainNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'flex items-center py-2 px-4 text-sm font-medium rounded-md',
            location.pathname === item.href
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
