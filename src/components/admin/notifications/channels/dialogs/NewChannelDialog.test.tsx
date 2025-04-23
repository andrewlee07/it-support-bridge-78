import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NewChannelDialog from './NewChannelDialog';

describe('NewChannelDialog', () => {
  it('renders the New Channel Dialog', () => {
    render(<NewChannelDialog />);
    expect(screen.getByText(/new|channel|dialog/i)).toBeInTheDocument();
  });
});
