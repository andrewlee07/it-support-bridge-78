import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DropdownFieldsTab from './DropdownFieldsTab';

describe('DropdownFieldsTab', () => {
  it('renders the Dropdown Fields Tab', () => {
    render(<DropdownFieldsTab />);
    expect(screen.getByText(/dropdown/i)).toBeInTheDocument();
  });
});
