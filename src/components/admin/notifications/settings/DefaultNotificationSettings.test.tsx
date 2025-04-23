import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DefaultNotificationSettings from './DefaultNotificationSettings';

describe('DefaultNotificationSettings', () => {
  it('renders the Default Notification Settings', () => {
    render(<DefaultNotificationSettings />);
    expect(screen.getByText(/default|notification|settings/i)).toBeInTheDocument();
  });
});
