import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders the Page Header', () => {
    render(<PageHeader />);
    expect(screen.getByText(/header|title|page/i)).toBeInTheDocument();
  });
});
