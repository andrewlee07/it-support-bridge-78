import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModuleConfigurationCard from './ModuleConfigurationCard';

describe('ModuleConfigurationCard', () => {
  it('renders the Module Configuration Card', () => {
    render(<ModuleConfigurationCard />);
    expect(screen.getByText(/module/i)).toBeInTheDocument();
  });
});
