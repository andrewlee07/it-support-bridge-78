import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChannelTable from './ChannelTable';

describe('ChannelTable', () => {
  it('renders the Channel Table', () => {
    render(<ChannelTable />);
    expect(screen.getByText(/channel|table/i)).toBeInTheDocument();
  });
});
