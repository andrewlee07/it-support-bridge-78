import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RiskQuestionsContent from './RiskQuestionsContent';

describe('RiskQuestionsContent', () => {
  it('renders the Risk Questions Content', () => {
    render(<RiskQuestionsContent />);
    expect(screen.getByText(/risk|question|content/i)).toBeInTheDocument();
  });
});
