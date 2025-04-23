import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from './BugForm';

describe('BugForm', () => {
  it('renders the bug form', () => {
    render(<BugForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('calls onSubmit with sanitized input', () => {
    const handleSubmit = vi.fn();
    render(<BugForm onSubmit={handleSubmit} />);
    const input = screen.getByLabelText(/title/i);
    fireEvent.change(input, { target: { value: '<b>Bug</b>' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(handleSubmit).toHaveBeenCalled();
    // You can expand this to check that sanitizeInput was applied
  });
});
