import React from 'react';
import { Link } from 'react-router-dom';
import NewBadge from '../components/NewBadge';

const Product = ({ product, id }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="group grad w-full h-[362px] rounded-[8px] overflow-hidden relative">
        <div className="w-full h-[200px] flex items-center justify-center relative">
          {product.isNew && <NewBadge />}
          <img
            className="w-[160px] h-[160px] group-hover:scale-90 transition-all"
            src={`${process.env.REACT_APP_API_URL}${product.image?.data?.attributes?.url}`}
            alt={''}
          />
        </div>
        <div className="px-6 pb-8 flex flex-col">
          <div className="text-sm text-accent capitalize mb-2">
            {product.categories?.data[0]?.attributes?.title}
          </div>
          <div className="text-[15px] mb-4 lg:mb-9">
            {product.title?.length > 35
              ? product.title?.substring(0, 35)?.trim() + '...'
              : product.title}
          </div>
          <div className="text-lg text-accent">${product.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
