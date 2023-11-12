import PropTypes from 'prop-types';

export default function Shop({ items }) {
  return (
    <>
      <p>This is the Shop page.</p>

      {items.length > 0 ? (
        <ul className="items">
          {items.map((item) => (
            <li key={item.id} className="item">
              <img src={item.image} alt={item.title} className="item-image" />
              {item.isInCart ? (
                <button type="button">Remove from Cart</button>
              ) : (
                <button type="button">Add to Cart</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in stock.</p>
      )}
    </>
  );
}

Shop.propTypes = {
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

Shop.defaultProps = {
  items: [],
};
