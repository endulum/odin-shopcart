import PropTypes from 'prop-types';

export default function Item({ item, dispatch }) {
  function handleAddToCart(id) {
    dispatch({
      type: 'add_to_cart',
      id,
    });
  }

  function handleRemoveFromCart(id) {
    dispatch({
      type: 'remove_from_cart',
      id,
    });
  }

  return item ? (
    <div>
      <img src={item.image} alt={item.title} />
      <h1>
        {item.title}
        {' | '}
        <span style={{ fontWeight: 'normal' }}>{item.category}</span>
      </h1>
      <h2>
        $
        {item.price.toFixed(2)}
      </h2>
      <p>{item.description}</p>
      <p>
        You have
        {' '}
        {item.quantity}
        {' '}
        in your cart.
        {' '}
        <br />
        {item.isInCart && item.quantity > 0 ? (
          <button type="button" onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
        ) : (
          <button type="button" onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
        )}
      </p>
    </div>
  ) : (
    <p>No item found at this URL.</p>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    isInCart: PropTypes.bool,
    quantity: PropTypes.number,
  }),
  dispatch: PropTypes.func.isRequired,
};

Item.defaultProps = {
  item: PropTypes.null,
};
