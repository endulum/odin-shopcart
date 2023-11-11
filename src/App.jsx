import { Routes, Route } from 'react-router-dom';

import Layout from './routes/Layout';
import Index from './routes/Index';
import Shop from './routes/Shop';
import Cart from './routes/Cart';
import NoMatch from './routes/NoMatch';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/shop/item/:itemId" /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
