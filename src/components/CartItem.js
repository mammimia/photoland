import React, { useContext } from 'react';
import { IoTrash } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Qty from './Qty';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  if (!item) return null;

  return (
    <div className="flex gap-x-8">
      <Link to={`product/${item.id}`} className="w-[70px] h-[70px]">
        <img
          src={`${process.env.REACT_APP_API_URL}${item.attributes?.image?.data?.attributes?.url}`}
          alt=""
        />
        <h3>{item.title}</h3>
      </Link>
      <div className="flex-1">
        <div className="flex gap-x-4 mb-3">
          <Link to={`product/${item.id}`}>{item.attributes?.title}</Link>
          <div
            className="cursor-pointer text-[24px] hover:text-accent transition-all"
            onClick={() => removeFromCart(item.id)}
          >
            <IoTrash />
          </div>
        </div>
        <div className="flex items-center gap-x-12">
          <div className="flex gap-x-4 mb-2">
            <Qty item={item} />
            <div className="text-accent text-xl">
              $ {item.attributes.price * item.amount}
            </div>
          </div>
        </div>
        <div>
          <span className="text-accent">
            $ {item.attributes?.price} per piece
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
