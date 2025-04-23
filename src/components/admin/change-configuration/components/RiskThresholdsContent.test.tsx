import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiskThresholdsContent from './RiskThresholdsContent';

describe('RiskThresholdsContent', () => {
  it('renders the Risk Thresholds Content', () => {
    render(<RiskThresholdsContent />);
    expect(screen.getByText(/risk|threshold|content/i)).toBeInTheDocument();
  });
});
