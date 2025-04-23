import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChannelIcon from './ChannelIcon';

describe('ChannelIcon', () => {
  it('renders the Channel Icon', () => {
    render(<ChannelIcon />);
    expect(screen.getByTestId('channel-icon')).toBeInTheDocument();
  });
});
