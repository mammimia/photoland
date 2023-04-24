import React from 'react';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const CategoryNavMobile = ({ setCatNavMobile }) => {
  const { data: categories } = useFetch('/categories');

  return (
    <div className="w-full h-full bg-primary p-8">
      <div
        className="flex justify-end mb-8 cursor-pointer"
        onClick={() => setCatNavMobile(false)}
      >
        <FiX className="text-3xl" />
      </div>
      <div className="flex flex-col gap-y-8">
        {categories?.map((category) => (
          <Link
            className="uppercase font-medium"
            to={`category/${category.id}`}
            key={category.id}
          >
            {category.attributes.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavMobile;
