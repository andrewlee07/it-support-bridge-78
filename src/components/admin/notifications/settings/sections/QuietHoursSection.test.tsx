import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuietHoursSection from './QuietHoursSection';

describe('QuietHoursSection', () => {
  it('renders the Quiet Hours Section', () => {
    render(<QuietHoursSection />);
    expect(screen.getByText(/quiet|hours|section/i)).toBeInTheDocument();
  });
});
