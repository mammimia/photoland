import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [itemsAmount, setItemsAmount] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amount = cart.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    setItemsAmount(amount);
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.amount * item.attributes.price;
    }, 0);
    setTotal(total);
  }, [cart]);

  const addToCart = (item, id) => {
    const itemId = parseInt(id);
    const newItem = { ...item, amount: 1 };
    const cartItem = cart.find((item) => item.id === itemId);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === itemId) {
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

  const setItemAmount = (id, amount) => {
    const value = parseInt(amount);
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          if (isNaN(value)) {
            return { ...item, amount: 1 };
          }
          return { ...item, amount: value };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        cart,
        addToCart,
        removeFromCart,
        itemsAmount,
        setItemAmount,
        total,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
