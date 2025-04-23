import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DeliveryChannelsSection from './DeliveryChannelsSection';

describe('DeliveryChannelsSection', () => {
  it('renders the Delivery Channels Section', () => {
    render(<DeliveryChannelsSection />);
    expect(screen.getByText(/delivery|channel|section/i)).toBeInTheDocument();
  });
});
