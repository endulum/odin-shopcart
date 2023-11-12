/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Shop({ items }) {
  const [search, setSearch] = useState({
    title: '',
    category: '',
  });

  function filteredItems() {
    return items.filter((item) => (
      (item.title.toLowerCase().includes(search.title) || search.title === '')
        && (item.category.includes(search.category) || search.category === '')
    ));
  }

  function handleSearchTitle(e) {
    setSearch({ ...search, title: e.target.value });
  }

  function handleSearchCategory(e) {
    setSearch({ ...search, category: e.target.value });
  }

  return (
    <>
      <p>This is the Shop page.</p>

      <div className="item-search">
        <div>
          <label htmlFor="search-title">Item Name</label>
          <input type="text" id="search-title" onChange={handleSearchTitle} />
        </div>

        <div>
          <label htmlFor="search-category">Item Category</label>
          <select data-testid="search-category" id="search-category" onChange={handleSearchCategory}>
            <option value="">All Categories</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>
      </div>

      {filteredItems().length > 0 ? (
        <ul className="items">
          {filteredItems().map((item) => (
            <li key={item.id} className="item">
              <img src={item.image} alt={item.title} className="item-image" width="100" />
              {item.isInCart ? (
                <button type="button">Remove from Cart</button>
              ) : (
                <button type="button">Add to Cart</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
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
