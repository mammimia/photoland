import React, { useContext } from 'react';
import { IoArrowForward, IoCartOutline, IoClose } from 'react-icons/io5';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import { loadStripe } from '@stripe/stripe-js';
import { request } from '../utils/request';

const Cart = () => {
  const { cart, setIsOpen, total, clearCart } = useContext(CartContext);

  console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const rest = await request.post('/orders', {
        cart
      });

      await stripe.redirectToCheckout({
        sessionId: rest.data.stripeSession.id
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full px-4 text-white">
      <div className="overflow-y-auto overflow-x-hidden h-[75vh]">
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
      {cart.length >= 1 && (
        <div className="px-6 py-10 flex flex-col">
          <div className="flex justify-between text-lg">
            <div>Subtotal</div>
            <div>$ {total}</div>
          </div>
          <div className="flex justify-between text-2xl">
            <div>Total</div>
            <div>$ {total}</div>
          </div>
        </div>
      )}
      <div className="px-6">
        {cart.length >= 1 ? (
          <div className="flex justify-between gap-x-4">
            <button
              className="btn btn-accent hover:bg-accent-hover text-primary"
              onClick={clearCart}
            >
              Clear cart
            </button>
            <button
              className="btn btn-accent hover:bg-accent-hover text-primary
             flex-1 px-2 gap-x-2"
              onClick={handleCheckout}
            >
              Checkout
              <IoArrowForward className="text-lg" />
            </button>
          </div>
        ) : (
          <div
            className="h-full absolute top-0 right-0 left-0 flex justify-center
           items-center -z-10 flex-col text-white/30"
          >
            <div className="text-2xl">Your cart is empty</div>
            <div className="text-6xl">
              <IoCartOutline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
