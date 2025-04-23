import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiskTabs from './RiskTabs';

describe('RiskTabs', () => {
  it('renders the Risk Tabs', () => {
    render(<RiskTabs />);
    expect(screen.getByText(/risk|tab/i)).toBeInTheDocument();
  });
});
