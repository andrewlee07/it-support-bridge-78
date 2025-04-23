import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotificationTemplateList from './NotificationTemplateList';

describe('NotificationTemplateList', () => {
  it('renders the Notification Template List', () => {
    render(<NotificationTemplateList />);
    expect(screen.getByText(/notification|template|list/i)).toBeInTheDocument();
  });
});
