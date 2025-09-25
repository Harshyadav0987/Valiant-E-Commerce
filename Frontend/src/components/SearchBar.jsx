import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'

function SearchBar() {
  const { setSearch, ShowSearch, setShowSearch ,navigate} = useContext(ValiantContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (ShowSearch) {
      setQuery('');
      setSearch('');
    }
  }, [ShowSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(query);      // same as Search button
    }
    if (e.key === "Escape") {
      setShowSearch(false);  // same as Close button
    }
  };

  return ShowSearch ? (
    <div className="absolute top-[64px] left-0 w-full z-50 bg-white shadow-md flex items-center justify-center py-3">
      {/* Desktop */}
      <div className="sm:flex items-center gap-2 w-full max-w-md hidden">
        <input
          type="text"
          className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}   // ✅ added here
        />
        <button 
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
          onClick={() => {setSearch(query), navigate('/collection')}}
          
        >
          Search
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
          onClick={() => setShowSearch(false)}
        >
          Close
        </button>
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center gap-2 w-full px-4">
        <input
          type="search"
          className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full h-8"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}   // ✅ added here too
        />
        <button
          className="bg-gray-800 text-white px-4 py-1 rounded h-8"
          onClick={() => setSearch(query)}
        >
          Search
        </button>
      </div>
    </div>
  ) : null;
}

export default SearchBar;
