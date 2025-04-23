import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GeneralPreferencesSection from './GeneralPreferencesSection';

describe('GeneralPreferencesSection', () => {
  it('renders the General Preferences Section', () => {
    render(<GeneralPreferencesSection />);
    expect(screen.getByText(/general|preferences|section/i)).toBeInTheDocument();
  });
});
