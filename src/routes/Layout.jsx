import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Layout({ cartCount }) {
  return (
    <div>
      <nav>
        <Link to="/">
          <button type="button">
            Home
          </button>
        </Link>

        <Link to="/shop">
          <button type="button">
            Shop
          </button>
        </Link>

        <Link to="/cart">
          <button type="button">
            Cart (
            {cartCount}
            )
          </button>
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

Layout.propTypes = {
  cartCount: PropTypes.number.isRequired,
};
