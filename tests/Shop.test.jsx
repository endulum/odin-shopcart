import {
  describe, expect, it,
} from 'vitest';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Shop from '../src/routes/Shop';
import products from './products';

describe('Shop', () => {
  it('displays all items', () => {
    render(<Shop items={products} />);
    expect(screen.queryAllByRole('listitem').length).toBe(20);
  });

  it('displays message when no items received', () => {
    render(<Shop />);
    expect(screen.queryAllByRole('listitem').length).toBe(0);
    screen.getByText('No items found.');
  });
});

describe('Shop filtering', () => {
  it('can filter for name ("shirt")', async () => {
    render(<Shop items={products} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Item Name'), 'shirt');
    expect(screen.queryAllByRole('listitem').length).toBe(2);
  });

  it('can filter for category ("jewelry")', async () => {
    render(<Shop items={products} />);
    const user = userEvent.setup();
    await user.selectOptions(screen.getByTestId('search-category'), 'jewelery');
    expect(screen.queryAllByRole('listitem').length).toBe(4);
  });

  it('displays message when no items fit the filter', async () => {
    render(<Shop items={products} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Item Name'), 'awawawa');
    screen.getByText('No items found.');
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });
});
