import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkflowStagesTable from './WorkflowStagesTable';

describe('WorkflowStagesTable', () => {
  it('renders the Workflow Stages Table', () => {
    render(<WorkflowStagesTable />);
    expect(screen.getByText(/workflow|stage|table/i)).toBeInTheDocument();
  });
});
