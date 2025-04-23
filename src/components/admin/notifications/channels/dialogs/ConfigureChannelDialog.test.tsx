import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConfigureChannelDialog from './ConfigureChannelDialog';

describe('ConfigureChannelDialog', () => {
  it('renders the Configure Channel Dialog', () => {
    render(<ConfigureChannelDialog />);
    expect(screen.getByText(/configure|channel|dialog/i)).toBeInTheDocument();
  });
});
