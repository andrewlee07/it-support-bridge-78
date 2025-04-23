import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugDetailError from './BugDetailError';

describe('BugDetailError', () => {
  it('renders the Bug Detail Error', () => {
    render(<BugDetailError />);
    expect(screen.getByText(/bug|detail|error/i)).toBeInTheDocument();
  });
});
