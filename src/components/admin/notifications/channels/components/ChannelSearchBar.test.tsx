import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChannelSearchBar from './ChannelSearchBar';

describe('ChannelSearchBar', () => {
  it('renders the Channel Search Bar', () => {
    render(<ChannelSearchBar />);
    expect(screen.getByPlaceholderText(/search|channel/i)).toBeInTheDocument();
  });
});
