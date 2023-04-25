import React, { useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, setIsOpen } = useContext(CartContext);

  return (
    <div className="w-full h-full px-4 text-white">
      <div
        className="text-4xl w-20 h-[98px] flex justify-start
       items-center cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <IoClose />
      </div>
      <div className="flex flex-col gap-y-10 px-2">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
