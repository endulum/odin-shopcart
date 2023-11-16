/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStorage from '../hooks/useStorage';

export default function Shop({ items, dispatch }) {
  const [search, setSearch] = useStorage('search', {
    title: '',
    category: '',
  }, window.sessionStorage);

  function filteredItems() {
    return items.filter((item) => (
      (item.title.toLowerCase().includes(search.title) || search.title === '')
        && (item.category === search.category || search.category === '')
    ));
  }

  function handleSearchTitle(e) {
    setSearch({ ...search, title: e.target.value });
  }

  function handleSearchCategory(e) {
    setSearch({ ...search, category: e.target.value });
  }

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

  return (
    <>
      <p>This is the Shop page.</p>

      <div className="item-search">
        <div>
          <label htmlFor="search-title">Item Name</label>
          <input type="text" id="search-title" defaultValue={search.title} onChange={handleSearchTitle} />
        </div>

        <div>
          <label htmlFor="search-category">Item Category</label>
          <select data-testid="search-category" id="search-category" defaultValue={search.category} onChange={handleSearchCategory}>
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
              <Link to={`/item/${item.id}`}>
                <button type="button">View item</button>
              </Link>
              {item.isInCart && item.quantity > 0 ? (
                <button type="button" onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
              ) : (
                <button type="button" onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
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
  dispatch: PropTypes.func.isRequired,
};

Shop.defaultProps = {
  items: [],
};
