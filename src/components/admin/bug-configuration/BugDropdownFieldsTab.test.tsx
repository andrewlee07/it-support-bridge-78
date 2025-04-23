import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugDropdownFieldsTab from './BugDropdownFieldsTab';

describe('BugDropdownFieldsTab', () => {
  it('renders the Bug Dropdown Fields Tab', () => {
    render(<BugDropdownFieldsTab />);
    expect(screen.getByText(/dropdown/i)).toBeInTheDocument();
  });
});
