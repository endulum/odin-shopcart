/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { RemoveShoppingCart } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

export default function Cart({ items, dispatch }) {
  function handleChangeItemQuantity(id, quantity) {
    // console.log(quantity);
    dispatch({
      type: 'change_item_quantity',
      id,
      quantity: quantity === '' || quantity === '0' ? 1 : parseInt(quantity, 10),
    });
  }

  function handleRemoveFromCart(id) {
    dispatch({
      type: 'remove_from_cart',
      id,
    });
  }

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <main className="cart">
      {items.length > 0 ? (
        <Card variant="outlined" className="cart-card">
          <ul>
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-details">
                  <div>
                    <Typography variant="caption">{item.title}</Typography>
                    <Typography variant="subtitle1">
                      $
                      {item.price}
                    </Typography>
                  </div>

                  <div className="cart-controls">
                    <TextField
                      type="number"
                      size="small"
                      id={`item-quantity-${item.id}`}
                      label="Quantity"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleChangeItemQuantity(item.id, e.target.value)}
                    />
                    <IconButton aria-label="Remove this item from cart" onClick={() => handleRemoveFromCart(item.id)}>
                      <RemoveShoppingCart />
                    </IconButton>
                  </div>
                </div>

                <Tooltip title="View this item">
                  <Link to={`/item/${item.id}`}>
                    <img src={item.image} alt={item.title} className="cart-img" />
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <Typography variant="subtitle1">
              Total:
              {' '}
              <b>
                $
                {items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toLocaleString('en-US', options)}
              </b>
            </Typography>

            <Button variant="contained">Checkout</Button>
          </div>
        </Card>
      ) : (
        <Typography variant="subtitle1">
          <i>
            No items in cart.
          </i>
        </Typography>
      )}
    </main>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    isInCart: PropTypes.bool,
    quantity: PropTypes.number,
  })),
  dispatch: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  items: [],
};
