import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiskQuestionsTab from './RiskQuestionsTab';

describe('RiskQuestionsTab', () => {
  it('renders the Risk Questions Tab', () => {
    render(<RiskQuestionsTab />);
    expect(screen.getByText(/risk|question/i)).toBeInTheDocument();
  });
});
