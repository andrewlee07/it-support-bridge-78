import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestCaseDetail from './TestCaseDetail';

describe('TestCaseDetail', () => {
  it('renders the Test Case Detail', () => {
    render(<TestCaseDetail />);
    expect(screen.getByText(/test case|detail/i)).toBeInTheDocument();
  });
});
