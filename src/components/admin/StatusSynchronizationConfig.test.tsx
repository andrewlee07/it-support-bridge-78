import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusSynchronizationConfig from './StatusSynchronizationConfig';

describe('StatusSynchronizationConfig', () => {
  it('renders the Status Synchronization Config', () => {
    render(<StatusSynchronizationConfig />);
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });
});
