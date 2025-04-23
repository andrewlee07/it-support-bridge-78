import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugSeverityConfiguration from './BugSeverityConfiguration';

describe('BugSeverityConfiguration', () => {
  it('renders the Bug Severity Configuration', () => {
    render(<BugSeverityConfiguration />);
    expect(screen.getByText(/severity/i)).toBeInTheDocument();
  });
});
