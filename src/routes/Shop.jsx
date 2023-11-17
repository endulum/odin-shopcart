/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Visibility } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
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
    <main className="shop">
      <Card variant="outlined" className="item-search">
        <TextField value={search.title} id="search-title" label="Item Name" variant="outlined" size="small" onChange={handleSearchTitle} />
        <TextField
          select
          value={search.category}
          id="search-category"
          label="Item Category"
          variant="outlined"
          size="small"
          onChange={handleSearchCategory}
        >
          {[
            ['', 'All Categories'],
            ["women's clothing", "Women's Clothing"],
            ["men's clothing", "Men's Clothing"],
            ['electronics', 'Electronics'],
            ['jewelery', 'Jewelery'],
          ].map((category) => (
            <MenuItem key={category[0]} value={category[0]}>
              {category[1]}
            </MenuItem>
          ))}
        </TextField>
      </Card>

      {filteredItems().length > 0 ? (
        <ul className="items">
          {filteredItems().map((item) => (
            <li key={item.id}>
              <Card variant="outlined" className="item">
                <div className="card-top">
                  <div className="img-wrapper">
                    <img src={item.image} alt={item.title} className="item-image" />
                  </div>
                  <div className="title-wrapper">
                    <Typography variant="overline">{item.category}</Typography>
                    <Typography variant="subtitle2">{item.title}</Typography>
                  </div>
                </div>

                <div className="card-bottom">
                  <div className="button-wrapper">
                    <Typography variant="subtitle1">
                      $
                      {item.price.toFixed(2)}
                    </Typography>
                    <Link to={`/item/${item.id}`}>
                      <IconButton aria-label="view details of this item">
                        <Visibility />
                      </IconButton>
                    </Link>
                  </div>
                  {item.isInCart && item.quantity > 0 ? (
                    <Button variant="outlined" type="button" onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</Button>
                  ) : (
                    <Button variant="contained" type="button" onClick={() => handleAddToCart(item.id)}>Add to Cart</Button>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="subtitle1">
          <i>
            No items found.
          </i>
        </Typography>
      )}
    </main>
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
