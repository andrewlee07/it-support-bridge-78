import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DropdownFieldsTab from './DropdownFieldsTab';

describe('DropdownFieldsTab (Change Configuration)', () => {
  it('renders the Dropdown Fields Tab for Change Configuration', () => {
    render(<DropdownFieldsTab />);
    expect(screen.getByText(/dropdown/i)).toBeInTheDocument();
  });
});
