import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConfigurationSettings from './ConfigurationSettings';

describe('ConfigurationSettings', () => {
  it('renders the Configuration Settings', () => {
    render(<ConfigurationSettings />);
    expect(screen.getByText(/configuration/i)).toBeInTheDocument();
  });
});
