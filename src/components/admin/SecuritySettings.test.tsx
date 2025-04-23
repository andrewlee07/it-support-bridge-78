import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SecuritySettings from './SecuritySettings';

describe('SecuritySettings', () => {
  it('renders the Security Settings', () => {
    render(<SecuritySettings />);
    expect(screen.getByText(/security/i)).toBeInTheDocument();
  });
});
