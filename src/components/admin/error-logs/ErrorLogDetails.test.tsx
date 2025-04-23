import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorLogDetails from './ErrorLogDetails';

describe('ErrorLogDetails', () => {
  it('renders the Error Log Details', () => {
    render(<ErrorLogDetails />);
    expect(screen.getByText(/error|log|details/i)).toBeInTheDocument();
  });
});
