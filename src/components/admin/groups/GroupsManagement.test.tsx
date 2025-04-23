import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GroupsManagement from './GroupsManagement';

describe('GroupsManagement', () => {
  it('renders the Groups Management', () => {
    render(<GroupsManagement />);
    expect(screen.getByText(/groups|management/i)).toBeInTheDocument();
  });
});
