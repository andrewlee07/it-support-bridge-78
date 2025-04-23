import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AutoCloseConfigurationTab from './AutoCloseConfigurationTab';

describe('AutoCloseConfigurationTab', () => {
  it('renders the Auto Close Configuration Tab', () => {
    render(<AutoCloseConfigurationTab />);
    expect(screen.getByText(/auto close/i)).toBeInTheDocument();
  });
});
