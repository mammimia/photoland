import React from 'react';
import { FiX } from 'react-icons/fi';

const CategoryNavMobile = ({ setCatNavMobile }) => {
  return (
    <div className="w-full h-full bg-primary p-8">
      <div
        className="flex justify-end mb-8 cursor-pointer"
        onClick={() => setCatNavMobile(false)}
      >
        <FiX className="text-3xl" />
      </div>
      CategoryNavMobile
    </div>
  );
};

export default CategoryNavMobile;
