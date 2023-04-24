import React from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CategoryNav from '../components/CategoryNav';
import Product from './Product';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');

  const { data: products } = useFetch(
    `/products?populate=*&filters[title][$contains]=${searchTerm}`
  );

  console.log(products);

  return (
    <div className="mb-[30px] pt-40 lg:pt-4 lg:pt-0">
      <div className="container mx-auto">
        <div className="flex gap-x-[30px]">
          <CategoryNav />
          <div>
            <div className="py-3 text-xl uppercase text-center lg:text-left">
              {products?.length > 0
                ? `${products.length} results for ${searchTerm}`
                : `no results found for ${searchTerm}`}
            </div>
            <div
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4
          gap-[15px] md:gap-[30px]"
            >
              {products?.map((product) => (
                <Product key={product.id} product={product.attributes} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
