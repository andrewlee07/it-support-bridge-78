import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MandatoryFieldsConfig from './MandatoryFieldsConfig';

describe('MandatoryFieldsConfig', () => {
  it('renders the Mandatory Fields Config', () => {
    render(<MandatoryFieldsConfig />);
    expect(screen.getByText(/mandatory|field|config/i)).toBeInTheDocument();
  });
});
