import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugDetail from './BugDetail';

describe('BugDetail', () => {
  it('renders the Bug Detail', () => {
    render(<BugDetail />);
    expect(screen.getByText(/bug|detail/i)).toBeInTheDocument();
  });
});
