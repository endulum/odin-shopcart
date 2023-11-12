import {
  describe, expect, it,
} from 'vitest';
import { render, screen } from '@testing-library/react';

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
