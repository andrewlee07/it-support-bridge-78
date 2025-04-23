import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorLogFilters from './ErrorLogFilters';

describe('ErrorLogFilters', () => {
  it('renders the Error Log Filters', () => {
    render(<ErrorLogFilters />);
    expect(screen.getByText(/error|log|filter/i)).toBeInTheDocument();
  });
});
