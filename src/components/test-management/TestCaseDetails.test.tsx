import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestCaseDetails from './TestCaseDetails';

describe('TestCaseDetails', () => {
  it('renders the Test Case Details', () => {
    render(<TestCaseDetails />);
    expect(screen.getByText(/test case|details/i)).toBeInTheDocument();
  });
});
