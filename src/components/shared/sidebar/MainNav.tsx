
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationItems } from './navigationItems';

const MainNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-2">
      {navigationItems.map((item) => (
        <React.Fragment key={item.href}>
          {item.label && (
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
              {item.label}
            </div>
          )}
          {item.items ? (
            <div className="space-y-1">
              {item.items.map((subItem) => (
                <NavLink
                  key={subItem.href}
                  href={subItem.href}
                  icon={subItem.icon}
                  isActive={location.pathname === subItem.href}
                >
                  {subItem.title}
                </NavLink>
              ))}
            </div>
          ) : (
            <NavLink
              href={item.href}
              icon={item.icon}
              isActive={location.pathname === item.href}
            >
              {item.title}
            </NavLink>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon,
  children,
  isActive,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span>{children}</span>
    </Link>
  );
};

export default MainNav;
