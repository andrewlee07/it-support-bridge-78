
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useSelectOptions } from '@/hooks/useDropdownOptions';
import { ConfigurableEntityType } from '@/utils/types';
import { Skeleton } from '@/components/ui/skeleton';

interface DynamicSelectProps {
  entityType: ConfigurableEntityType;
  fieldName: string;
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  entityType,
  fieldName,
  value,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  className,
}) => {
  const { selectOptions, isLoading, error } = useSelectOptions(entityType, fieldName);

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (error) {
    console.error(`Error loading options for ${entityType}.${fieldName}:`, error);
    return <p className="text-destructive text-sm">Failed to load options</p>;
  }

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || selectOptions.length === 0}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DynamicSelect;
