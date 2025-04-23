import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QueuesManagement from './QueuesManagement';

describe('QueuesManagement', () => {
  it('renders the Queues Management', () => {
    render(<QueuesManagement />);
    expect(screen.getByText(/queue|management/i)).toBeInTheDocument();
  });
});
