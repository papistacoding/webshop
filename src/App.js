import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';
import Order from "./components/Order/Order.js"
import Complete from "./components/Order/Complete.js"

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
      </>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path='/complete' element={<Complete/>} />
      </Routes>
      </BrowserRouter>
  );
}
export default App;
