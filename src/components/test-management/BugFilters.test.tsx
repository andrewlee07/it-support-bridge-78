import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugFilters from './BugFilters';

describe('BugFilters', () => {
  it('renders the Bug Filters', () => {
    render(<BugFilters />);
    expect(screen.getByText(/bug|filter/i)).toBeInTheDocument();
  });
});
