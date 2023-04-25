import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [itemsAmount, setItemsAmount] = useState([]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amount = cart.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    setItemsAmount(amount);
    console.log('amount', amount);
  }, [cart]);

  const addToCart = (item, id) => {
    const itemId = parseInt(id);
    const newItem = { ...item, amount: 1 };
    const cartItem = cart.find((item) => item.id === itemId);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === itemId) {
          setAmount(cartItem.amount + 1);
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
    setIsOpen(true);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        cart,
        addToCart,
        removeFromCart,
        itemsAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
