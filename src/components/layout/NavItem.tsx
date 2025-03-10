
import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  href: string;
  title: string;
  icon: React.ElementType;
}

export const NavItem: React.FC<NavItemProps> = ({ href, title, icon: Icon }) => {
  return (
    <Link
      to={href}
      className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
    >
      <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
      {title}
    </Link>
  );
};
