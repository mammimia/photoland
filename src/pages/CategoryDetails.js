import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CategoryNav from '../components/CategoryNav';
import Product from '../pages/Product';

const CategoryDetails = () => {
  const { id } = useParams();
  const { data: products } = useFetch(
    `/products?populate=*&filters[categories][id][$eq]=${id}`
  );
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (products) {
      setTitle(products[0].attributes?.categories?.data[0]?.attributes?.title);
    }
  }, [products]);

  return (
    <div className="mb-16 pt-40 lg:pt-0">
      <div className="container mx-auto">
        <div className="flex gap-x-[30px]">
          <CategoryNav />
          <main>
            <div className="py-3 text-xl uppercase text-center lg:text-left">
              {title} Cameras
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[30px]">
              {products?.map((product) => (
                <Product key={product.id} product={product.attributes} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
