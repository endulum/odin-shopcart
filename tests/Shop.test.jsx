import {
  describe, expect, it,
} from 'vitest';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Shop from '../src/routes/Shop';
import products from './products';

describe('Shop', () => {
  it('renders', () => {
    render(<Shop items={[]} />);
  });

  it('displays all items', () => {
    render(<Shop items={products} />);
    expect(screen.getAllByRole('listitem').length).toBe(20);
    expect(screen.getAllByRole('button', { name: 'Add to Cart' }).length).toBe(20);
    expect(screen.getAllByRole('img').length).toBe(20);
  });
});

describe('Shop filtering', () => {
  it('can filter for name ("shirt")', async () => {
    render(<Shop items={products} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Item Name'), 'shirt');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getAllByRole('listitem').length).toBe(2);
    expect(screen.getAllByRole('button', { name: 'Add to Cart' }).length).toBe(2);
    expect(screen.getAllByRole('img').length).toBe(2);
  });

  it('can filter for category ("jewelry")', async () => {
    render(<Shop items={products} />);
    const user = userEvent.setup();
    await user.selectOptions(screen.getByTestId('search-category'), 'jewelery');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('button', { name: 'Add to Cart' }).length).toBe(4);
    expect(screen.getAllByRole('img').length).toBe(4);
  });

  it('can still show all items if nothing was input', async () => {
    render(<Shop items={products} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getAllByRole('listitem').length).toBe(20);
    expect(screen.getAllByRole('button', { name: 'Add to Cart' }).length).toBe(20);
    expect(screen.getAllByRole('img').length).toBe(20);
  });
});
