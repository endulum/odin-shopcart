import {
  describe, it, beforeEach,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

beforeEach(() => {
  render(<BrowserRouter><App /></BrowserRouter>);
});

describe('App', () => {
  // it('renders', () => {
  //   screen.debug();
  // });

  it('can navigate in and out of each page', async () => {
    const user = userEvent.setup();

    screen.getByText('This is the index.');
    const homeButton = screen.getByRole('button', { name: 'Home' });
    await user.click(homeButton);
    screen.getByText('This is the index.');

    const shopButton = screen.getByRole('button', { name: 'Shop' });
    await user.click(shopButton);
    screen.getByText('This is the Shop page.');
    await user.click(homeButton);

    const cartButton = screen.getByRole('button', { name: 'Cart' });
    await user.click(cartButton);
    screen.getByText('This is the Cart page.');
    await user.click(homeButton);
  });
});
