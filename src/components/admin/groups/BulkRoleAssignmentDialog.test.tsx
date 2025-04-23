import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BulkRoleAssignmentDialog from './BulkRoleAssignmentDialog';

describe('BulkRoleAssignmentDialog', () => {
  it('renders the Bulk Role Assignment Dialog', () => {
    render(<BulkRoleAssignmentDialog />);
    expect(screen.getByText(/bulk|role|assignment|dialog/i)).toBeInTheDocument();
  });
});
