import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BugsTab from './BugsTab';

describe('BugsTab', () => {
  it('renders the Bugs Tab', () => {
    render(<BugsTab />);
    expect(screen.getByText(/bugs|tab/i)).toBeInTheDocument();
  });
});
