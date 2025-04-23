import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserMFASettings from './UserMFASettings';

describe('UserMFASettings', () => {
  it('renders the User MFA Settings', () => {
    render(<UserMFASettings />);
    expect(screen.getByText(/mfa/i)).toBeInTheDocument();
  });
});
