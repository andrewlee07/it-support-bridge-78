
import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonAction, useButtonActions } from '@/utils/buttons/buttonActionUtils';
import { Loader2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action: ButtonAction;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: LucideIcon;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * A standardized button component that handles various action types consistently
 * This component should be used for most interactive buttons in the application
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  variant = 'default',
  size = 'default',
  icon: Icon,
  isLoading = false,
  disabled = false,
  children,
  ...props
}) => {
  const { createClickHandler } = useButtonActions();
  const handleClick = createClickHandler(action);

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : Icon ? (
        <Icon className="h-4 w-4 mr-2" />
      ) : null}
      {children}
    </Button>
  );
};

export default ActionButton;
