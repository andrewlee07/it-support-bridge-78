import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugActions from './BugActions';

describe('BugActions', () => {
  it('renders the Bug Actions', () => {
    render(<BugActions />);
    expect(screen.getByText(/bug|action/i)).toBeInTheDocument();
  });
});
