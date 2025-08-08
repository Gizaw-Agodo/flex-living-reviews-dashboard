import React from 'react';
import type { ReviewFilters } from '../types/review.types';

interface FiltersProps {
  filters: ReviewFilters;
  sortBy: string;
  categories: string[];
  setFilters: React.Dispatch<React.SetStateAction<ReviewFilters>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const Filters = ({ filters, setFilters, sortBy, setSortBy, categories }: FiltersProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-md mb-8">
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-center">
        {/* Rating Filter Buttons */}
        <div className="flex flex-col">
          <label htmlFor="category-filter" className="text-gray-700 text-sm font-medium">Rating</label>
          <select
            id="rating-filter"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="0">All start</option>
            <option value="5"> 5 Stars </option>
            <option value="4">4 Stars And Up</option>
            <option value="3">3 Stars And Up</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col">
          <label htmlFor="category-filter" className="text-gray-700 text-sm font-medium">Category</label>
          <select
            id="category-filter"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>

        {/* Channel Filter */}
        <div className="flex flex-col">
          <label htmlFor="channel-filter" className="text-gray-700 text-sm font-medium">Channel</label>
          <select
            id="channel-filter"
            name="channel"
            value={filters.channel}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="all">All Channels</option>
            <option value="Hostaway">Hostaway</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="sort-by" className="text-gray-700 text-sm font-medium">Sort By</label>
          <select
            id="sort-by"
            name="sortBy"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="rating_desc">Highest Rating</option>
            <option value="rating_asc">Lowest Rating</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filters;