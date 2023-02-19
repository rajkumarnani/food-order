import { useState } from "react";
import Header from "./Layout/Header";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
  const[cartIsShown,setCartIsShoown] = useState(false);
  const showCartHandler =()=>{
    setCartIsShoown(true);
  }
  const hideCartHandler =()=>{
    setCartIsShoown(false);
  }
  
  
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />

      </main>
    </CartProvider>
  );
}

export default App;
