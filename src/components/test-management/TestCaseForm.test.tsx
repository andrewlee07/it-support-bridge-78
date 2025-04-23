import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestCaseForm from './TestCaseForm';

describe('TestCaseForm', () => {
  it('renders the Test Case Form', () => {
    render(<TestCaseForm />);
    expect(screen.getByText(/test case|form/i)).toBeInTheDocument();
  });
});
