import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiskThresholdsTab from './RiskThresholdsTab';

describe('RiskThresholdsTab', () => {
  it('renders the Risk Thresholds Tab', () => {
    render(<RiskThresholdsTab />);
    expect(screen.getByText(/risk|threshold/i)).toBeInTheDocument();
  });
});
