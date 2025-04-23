import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkflowConfigurationTab from './WorkflowConfigurationTab';

describe('WorkflowConfigurationTab', () => {
  it('renders the Workflow Configuration Tab', () => {
    render(<WorkflowConfigurationTab />);
    expect(screen.getByText(/workflow|configuration|tab/i)).toBeInTheDocument();
  });
});
