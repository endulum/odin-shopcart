import { Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';

import Layout from './routes/Layout';
import Index from './routes/Index';
import Shop from './routes/Shop';
import Cart from './routes/Cart';
import NoMatch from './routes/NoMatch';

import products from '../tests/products';
import itemsReducer from './itemsReducer';

export default function App() {
  const [items, dispatch] = useReducer(itemsReducer, products);

  return (
    <Routes>
      <Route element={<Layout />}>
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
        {/* <Route path="/shop/item/:itemId" /> */}
        <Route
          path="/cart"
          element={(
            <Cart
              dispatch={dispatch}
              items={items.filter((item) => item.isInCart && item.quantity > 0)}
            />
          )}
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
