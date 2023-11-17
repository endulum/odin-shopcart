import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PropTypes from 'prop-types';

export default function Layout({ cartCount }) {
  return (
    <>
      <nav>
        <ButtonGroup variant="outlined">
          <Link to="/">
            <Button type="button">
              Home
            </Button>
          </Link>

          <Link to="/shop">
            <Button type="button">
              Shop
            </Button>
          </Link>

          <Link to="/cart">
            <Button type="button">
              Cart (
              {cartCount}
              )
            </Button>
          </Link>
        </ButtonGroup>

      </nav>

      <Outlet />

    </>
  );
}

Layout.propTypes = {
  cartCount: PropTypes.number.isRequired,
};
