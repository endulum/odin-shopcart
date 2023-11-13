import {
  describe, expect, it,
} from 'vitest';
import { render, screen } from '@testing-library/react';

import Cart from '../src/routes/Cart';
import products from './products';
import getRandomItems from './getRandomItems';

describe('Cart', () => {
  it('shows all items', () => {
    render(<Cart items={products.filter((product) => [1, 2, 3, 4].includes(product.id))} />);
    expect(screen.queryAllByRole('listitem').length).toBe(4);
  });

  it('shows message when no items are in cart', () => {
    render(<Cart />);
    screen.getByText('No items in cart.');
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });
});

describe('Cart sum behavior', () => {
  it('correctly calculates sum of product costs (10 random items)', () => {
    const items = getRandomItems(10);
    render(<Cart items={items} />);
    const total = items.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
    screen.getByText(total);
  });

  it('correctly calculates sum of product costs (100 random items)', () => {
    const items = getRandomItems(100);
    render(<Cart items={items} />);
    const total = items.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
    screen.getByText(total);
  });
});
