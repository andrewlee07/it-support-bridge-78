import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkflowValidationSettings from './WorkflowValidationSettings';

describe('WorkflowValidationSettings', () => {
  it('renders the Workflow Validation Settings', () => {
    render(<WorkflowValidationSettings />);
    expect(screen.getByText(/workflow|validation|settings/i)).toBeInTheDocument();
  });
});
