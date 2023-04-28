import React, { useState } from 'react';
// import Header from '../Layout/Header';
import Meals from '../Meals/Meals';
import Cart from '../Cart/Cart';
import CartProvider from '../../store/CartProvider';
import Homenavbar from '../Homenavbar/Homenavbar';

export default function Home(props) {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const logout = () => {
        props.setIsLoggedIn(false);
    }

  return (
      <CartProvider>
          {cartIsShown && <Cart onClose={hideCartHandler} />}
          <Homenavbar onShowCart={showCartHandler} log={logout} />
          <main>
              <Meals />
          </main>
      </CartProvider>
  )
}
