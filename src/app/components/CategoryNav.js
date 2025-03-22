'use client';

import Link from 'next/link';
import { useResponsive } from '../contexts/ResponsiveContext';

export default function CategoryNav({ categories }) {
  const { isMobile, isTablet } = useResponsive();
  const mobileCategories = categories.slice(0, 8);
  
  if (isMobile) {
    return (
      <div className="w-full overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-2 pl-1">
          {mobileCategories.map((category) => (
            <Link 
              key={category.id}
              href={`/category/${category.id}`}
              className="flex-shrink-0 px-3 py-1 border border-gray-200 rounded-full bg-gray-50 text-gray-600 text-center text-sm transition-colors duration-300 hover:text-gray-900 hover:bg-gray-200 whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
          <Link 
            href="/category"
            className="flex-shrink-0 px-3 py-1 border border-gray-200 rounded-full bg-gray-50 text-gray-600 text-center text-sm transition-colors duration-300 hover:text-gray-900 hover:bg-gray-200 whitespace-nowrap"
          >
            更多 +
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 grid grid-flow-col grid-cols-12 grid-rows-2 gap-2.5 pr-8 mr-4 border-r border-gray-200">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={`/category/${category.id}`}
          className="inline-block w-full h-full border border-gray-200 rounded-md bg-gray-50 text-gray-600 text-center transition-colors duration-300 hover:text-gray-900 hover:bg-gray-200 flex flex-col items-center justify-center"
        >
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
} 