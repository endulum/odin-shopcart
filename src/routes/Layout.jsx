import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
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
            Cart
          </button>
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
