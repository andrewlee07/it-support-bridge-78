import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EventDocumentationTable from './EventDocumentationTable';

describe('EventDocumentationTable', () => {
  it('renders the Event Documentation Table', () => {
    render(<EventDocumentationTable />);
    expect(screen.getByText(/event|documentation|table/i)).toBeInTheDocument();
  });
});
