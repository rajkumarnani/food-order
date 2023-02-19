import React from "react";

const CartContext = React.createContext({
  item: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  total: 0,
  clear: () => {}
});

export default CartContext;
