import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiskAssessmentTabs from './RiskAssessmentTabs';

describe('RiskAssessmentTabs', () => {
  it('renders the Risk Assessment Tabs', () => {
    render(<RiskAssessmentTabs />);
    expect(screen.getByText(/risk|assessment|tab/i)).toBeInTheDocument();
  });
});
