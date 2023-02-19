import React, { useState } from "react";
import CartContext from "./Cart-Context";

const CartProvider = (props) => {
  const [data, setData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const totalPrice = (items, changer) => {
    if (changer === true) {
      const totally = items.price * items.amount;
      setTotalValue(totalValue + totally);
    }
    if (changer === false) {
      const reducer = items.price;
      setTotalValue(totalValue - reducer);
    }
  };

  const addHandler = (selectedItem) => {
    // console.log("Inside addHandler");
    setData((prevItems) => {
      const filtered = prevItems.filter((item) => {
        return item.id === selectedItem.id;
      });
      if (filtered.length > 0) {
        prevItems.map((item) => {
          if (item.id === selectedItem.id)
            item.amount = item.amount + selectedItem.amount;
            // console.log("item.amount", item.amount)
          return item;
        });
        return [...prevItems];
      } else {
        return [selectedItem, ...prevItems];
      }
    });
    totalPrice(selectedItem, true);
  };
  const removeHandler = (selectedItem) => {
    // console.log("Inside removeHandler");
    setData((prevItems) => {
      if (selectedItem.amount === 1) {
        const filtered = prevItems.filter((item) => {
          return item.id !== selectedItem.id;
        });
        return [...filtered];
      } else {
        prevItems.map((item) => {
          if (item.id === selectedItem.id) item.amount = item.amount - 1;
          return item;
        });
        return [...prevItems];
      }
    });
    totalPrice(selectedItem, false);
  };

  const clearHandler = () => {
    setTotalValue(0);
    setData([]);
  };

  const quantity =() => {
    // console.log('inside quantity',data);
    const filtered = data.reduce((acc,item)=> acc + item.amount,0)
    // console.log('fil', filtered);
    if(filtered){
      return filtered
    }else{
      return 0
    }
  }
  const cartContext = {
    item: data,
    removeItem: removeHandler,
    addItem: addHandler,
    total: totalValue,
    currentQuantity: quantity,
    clear: clearHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
