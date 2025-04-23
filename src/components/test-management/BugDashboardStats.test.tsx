import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugDashboardStats from './BugDashboardStats';

describe('BugDashboardStats', () => {
  it('renders the Bug Dashboard Stats', () => {
    render(<BugDashboardStats />);
    expect(screen.getByText(/bug|dashboard|stats/i)).toBeInTheDocument();
  });
});
