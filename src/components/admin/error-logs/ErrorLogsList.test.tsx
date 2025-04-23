import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorLogsList from './ErrorLogsList';

describe('ErrorLogsList', () => {
  it('renders the Error Logs List', () => {
    render(<ErrorLogsList />);
    expect(screen.getByText(/error|log|list/i)).toBeInTheDocument();
  });
});
