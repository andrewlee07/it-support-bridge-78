import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkflowSettingsTab from './WorkflowSettingsTab';

describe('WorkflowSettingsTab', () => {
  it('renders the Workflow Settings Tab', () => {
    render(<WorkflowSettingsTab />);
    expect(screen.getByText(/workflow|settings/i)).toBeInTheDocument();
  });
});
