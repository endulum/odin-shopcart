/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Cart({ items, dispatch }) {
  function handleChangeItemQuantity(id, quantity) {
    dispatch({
      type: 'change_item_quantity',
      id,
      quantity: parseInt(quantity, 10),
    });
  }

  function handleRemoveFromCart(id) {
    dispatch({
      type: 'remove_from_cart',
      id,
    });
  }

  return (
    <div>
      <p>This is the Cart page.</p>
      {items.length > 0 ? (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} width="100" />
                <p>
                  Price:
                  {' '}
                  <span>
                    $
                    {item.price.toFixed(2)}
                  </span>
                </p>
                <p>
                  <label htmlFor={`item-quantity-${item.id}`}>Quantity: </label>
                  <input type="number" id={`item-quantity-${item.id}`} min="1" value={item.quantity} onChange={(e) => handleChangeItemQuantity(item.id, e.target.value)} />
                </p>
                <p>
                  <Link to={`/item/${item.id}`}>
                    <button type="button">View item</button>
                  </Link>
                  <button type="button" onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
                </p>
              </li>
            ))}
          </ul>
          <p>
            Total:
            {' '}
            <span>
              $
              {items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}
            </span>
          </p>
        </>

      ) : (<p>No items in cart.</p>)}
    </div>
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
