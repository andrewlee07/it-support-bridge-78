
import React, { useState, KeyboardEvent } from 'react';
import { X, Tag as TagIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxTags?: number;
  maxLength?: number;
  className?: string;
  icon?: React.ReactNode;
}

const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  placeholder = 'Add tag...',
  disabled = false,
  maxTags = 10,
  maxLength = 20,
  className,
  icon = <TagIcon className="h-3 w-3" />,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }

    // Clear error when user starts typing again
    if (error) {
      setError(null);
    }
  };

  const addTag = (tag: string) => {
    // Validate empty tags
    if (tag.trim() === '') {
      return;
    }

    // Validate max tags
    if (value.length >= maxTags) {
      setError(`Maximum ${maxTags} tags allowed`);
      return;
    }

    // Validate duplicate tags
    if (value.includes(tag)) {
      setError(`"${tag}" already exists`);
      return;
    }

    // Validate tag length
    if (tag.length > maxLength) {
      setError(`Tags must be ${maxLength} characters or less`);
      return;
    }

    onChange([...value, tag]);
    setInputValue('');
    setError(null);
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    // Clear any errors when removing a tag
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="space-y-1">
      <div className={cn(
        "flex flex-wrap gap-2 p-2 border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        error && "border-destructive",
        className
      )}>
        {value.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-sm"
          >
            {icon}
            <span>{tag}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
              onClick={() => removeTag(index)}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove tag {tag}</span>
            </Button>
          </div>
        ))}
        
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={disabled || value.length >= maxTags}
          className="flex-1 min-w-[120px] border-0 p-0 pl-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          maxLength={maxLength}
        />
      </div>
      
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};

export default TagInput;
