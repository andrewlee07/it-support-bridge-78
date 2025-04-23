import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugList from './BugList';

describe('BugList', () => {
  it('renders the Bug List', () => {
    render(<BugList />);
    expect(screen.getByText(/bug|list/i)).toBeInTheDocument();
  });
});
