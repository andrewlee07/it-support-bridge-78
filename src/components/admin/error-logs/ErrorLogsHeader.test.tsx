import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorLogsHeader from './ErrorLogsHeader';

describe('ErrorLogsHeader', () => {
  it('renders the Error Logs Header', () => {
    render(<ErrorLogsHeader />);
    expect(screen.getByText(/error|log|header/i)).toBeInTheDocument();
  });
});
