import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GroupRoleManagement from './GroupRoleManagement';

describe('GroupRoleManagement', () => {
  it('renders the Group Role Management', () => {
    render(<GroupRoleManagement />);
    expect(screen.getByText(/group|role|management/i)).toBeInTheDocument();
  });
});
