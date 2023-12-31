import { Routes, Route } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import Typography from '@mui/material/Typography';
import useFetch from './hooks/useFetch';
import '@fontsource/roboto';
import './style.css';

import Layout from './routes/Layout';
import Index from './routes/Index';
import Shop from './routes/Shop';
import Item from './routes/Item';
import Cart from './routes/Cart';
import NoMatch from './routes/NoMatch';

// import products from '../tests/products';
import itemsReducer from './itemsReducer';

export default function App() {
  const [loading, error, value] = useFetch('https://fakestoreapi.com/products');
  const [items, dispatch] = useReducer(itemsReducer, null);

  useEffect(() => {
    if (value !== null) {
      dispatch({
        type: 'load_inventory',
        data: value,
      });
    }
  }, [loading, value]);

  return items ? (
    <Routes>
      <Route element={(
        <Layout cartCount={items.reduce((total, item) => {
          if (item.isInCart) return total + item.quantity;
          return total;
        }, 0)}
        />
      )}
      >
        <Route index element={<Index />} />
        <Route
          path="/shop"
          element={(
            <Shop
              dispatch={dispatch}
              items={items}
            />
          )}
        />
        <Route
          path="/cart"
          element={(
            <Cart
              dispatch={dispatch}
              items={items.filter((item) => item.isInCart && item.quantity > 0)}
            />
          )}
        />
        {items.map((item) => <Route key={item.id} path={`/item/${item.id}`} element={<Item item={item} dispatch={dispatch} />} />)}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  ) : (
    <main className="loading">
      <Typography variant="subtitle1">
        <i>
          {loading && 'Loading...'}
          {error && `An error has occurred! ${error}`}
        </i>
      </Typography>
    </main>
  );
}
