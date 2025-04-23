import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotificationChannelList from './NotificationChannelList';

describe('NotificationChannelList', () => {
  it('renders the Notification Channel List', () => {
    render(<NotificationChannelList />);
    expect(screen.getByText(/notification|channel|list/i)).toBeInTheDocument();
  });
});
