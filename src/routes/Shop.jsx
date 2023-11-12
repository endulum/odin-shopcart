/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Shop({ items }) {
  const [search, setSearch] = useState({
    title: '',
    category: '',
  });
  // useEffect(() => {
  //   console.log(search);
  // }, [search]);
  return (
    <>
      <p>This is the Shop page.</p>

      <form
        id="item-search"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch({
            title: document.getElementById('search-title').value.toLowerCase() || '',
            category: document.getElementById('search-category').value || '',
          });
        }}
      >
        <div>
          <label htmlFor="search-title">Item Name</label>
          <input type="text" id="search-title" />
        </div>

        <div>
          <label htmlFor="search-category">Item Category</label>
          <select data-testid="search-category" id="search-category">
            <option value="">All Categories</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>

        <button type="submit">Search</button>
      </form>

      {items.length > 0 ? (
        <ul className="items">
          {items.map((item) => {
            if (
              (item.title.toLowerCase().includes(search.title) || search.title === '')
              && (item.category.includes(search.category) || search.category === '')
            ) {
              return (
                <li key={item.id} className="item">
                  <img src={item.image} alt={item.title} className="item-image" />
                  {item.isInCart ? (
                    <button type="button">Remove from Cart</button>
                  ) : (
                    <button type="button">Add to Cart</button>
                  )}
                </li>
              );
            }
            return null;
          })}
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
