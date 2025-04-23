import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApprovalSettings from './ApprovalSettings';

describe('ApprovalSettings', () => {
  it('renders the Approval Settings', () => {
    render(<ApprovalSettings />);
    expect(screen.getByText(/approval|settings/i)).toBeInTheDocument();
  });
});
