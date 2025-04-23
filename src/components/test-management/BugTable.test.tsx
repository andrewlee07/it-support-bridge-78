import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugTable from './BugTable';

describe('BugTable', () => {
  it('renders the Bug Table', () => {
    render(<BugTable />);
    expect(screen.getByText(/bug|table/i)).toBeInTheDocument();
  });
});
