import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RelatedProducts from '../components/RelatedProducts';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useFetch(`/products?populate=*&filters[id][$eq]=${id}`);

  const product = data?.[0].attributes;

  if (!product) return <div className="container mx-auto">Loading...</div>;

  console.log(product);
  return (
    <div className="mb-16 pt-44 lg:pt-[30px] xl:pt-0">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-[30px] mb-[30px]">
          <div
            className="flex-1 lg:max-w-[40%] lg:h-[540px] grad rounded-lg
          flex justify-center items-center"
          >
            <img
              src={`${process.env.REACT_APP_API_URL}${product?.image?.data?.attributes?.url}`}
              alt=""
              className="w-full max-w-[65%]"
            />
          </div>
          <div
            className="flex-1 bg-primary p-12 xl:p-20 rounded-xl flex flex-col
          justify-center"
          >
            <div className="uppercase text-accent text-lg font-medium mb-2">
              {product.categories?.data[0]?.attributes?.title} cameras
            </div>
            <h2 className="h2 mb-4">{product.title}</h2>
            <p className="mb-12">{product.description}</p>
            <div className="flex items-center gap-x-8">
              <div className="text-3xl text-accent font-semibold">
                ${product.price}
              </div>
              <button className="btn btn-accent">Add to cart</button>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDetails;
