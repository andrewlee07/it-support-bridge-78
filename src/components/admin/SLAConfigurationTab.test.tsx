import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SLAConfigurationTab from './SLAConfigurationTab';

describe('SLAConfigurationTab', () => {
  it('renders the SLA Configuration Tab', () => {
    render(<SLAConfigurationTab />);
    expect(screen.getByText(/sla/i)).toBeInTheDocument();
  });
});
