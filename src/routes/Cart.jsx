import PropTypes from 'prop-types';

export default function Cart({ items }) {
  return (
    <div>
      {items.length > 0 ? (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} />
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
          <p>
            Total:
            {' '}
            <span>{items.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}</span>
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
};

Cart.defaultProps = {
  items: [],
};
