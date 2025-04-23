import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChannelTableRow from './ChannelTableRow';

describe('ChannelTableRow', () => {
  it('renders the Channel Table Row', () => {
    render(<ChannelTableRow />);
    expect(screen.getByText(/channel|row/i)).toBeInTheDocument();
  });
});
