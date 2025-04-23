import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BusinessHoursConfigurationTab from './BusinessHoursConfigurationTab';

describe('BusinessHoursConfigurationTab', () => {
  it('renders the Business Hours Configuration Tab', () => {
    render(<BusinessHoursConfigurationTab />);
    expect(screen.getByText(/business hours/i)).toBeInTheDocument();
  });
});
