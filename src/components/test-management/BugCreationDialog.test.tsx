import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugCreationDialog from './BugCreationDialog';

describe('BugCreationDialog', () => {
  it('renders the Bug Creation Dialog', () => {
    render(<BugCreationDialog />);
    expect(screen.getByText(/bug|creation|dialog/i)).toBeInTheDocument();
  });
});
