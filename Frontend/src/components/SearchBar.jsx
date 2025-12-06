// import React, { useContext, useEffect, useState } from 'react'
// import { ValiantContext } from '../context/ValiantContext'

// function SearchBar() {
//   const { setSearch, ShowSearch, setShowSearch ,navigate} = useContext(ValiantContext);
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     if (ShowSearch) {
//       setQuery('');
//       setSearch('');
//     }
//   }, [ShowSearch]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       setSearch(query);      // same as Search button
//     }
//     if (e.key === "Escape") {
//       setShowSearch(false);  // same as Close button
//     }
//   };

//   return ShowSearch ? (
//     <div className="absolute top-[64px] left-0 w-full z-50 bg-white shadow-md flex items-center justify-center py-3">
//       {/* Desktop */}
//       <div className="sm:flex items-center gap-2 w-full max-w-md hidden">
//         <input
//           type="text"
//           className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full"
//           placeholder="Search..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}   // ✅ added here
//         />
//         <button 
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
//           onClick={() => {setSearch(query), navigate('/collection')}}
          
//         >
//           Search
//         </button>
//         <button
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
//           onClick={() => setShowSearch(false)}
//         >
//           Close
//         </button>
//       </div>

//       {/* Mobile */}
//       <div className="flex sm:hidden items-center gap-2 w-full px-4">
//         <input
//           type="search"
//           className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full h-8"
//           placeholder="Search..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}   // ✅ added here too
//         />
//         <button
//           className="bg-gray-800 text-white px-4 py-1 rounded h-8"
//           onClick={() => setSearch(query)}
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   ) : null;
// }

// export default SearchBar;

import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import sanitizeHtml from 'sanitize-html';
import { toast } from 'react-toastify';


function SearchBar() {
  const { setSearch, ShowSearch, setShowSearch, navigate } = useContext(ValiantContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (ShowSearch) {
      setQuery('');
      setSearch('');
    }
  }, [ShowSearch]);

  const handleSearch = () => {

    const cleanQuery = sanitizeHtml(query, {
      allowedTags: [],
      allowedAttributes: {}
    }).trim();

    if (!cleanQuery) {
      toast.error("Please enter a search query, don't try to be smart");
      setSearch('');
      return;
    }

    if (cleanQuery.length > 100) {
      toast.error("Search query too long");
      return;
    }


    setSearch(cleanQuery);
    navigate('/collection');
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      setShowSearch(false);
    }
  };

  return ShowSearch ? (
    <div className="fixed top-[73px] left-0 w-full z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 lg:px-12 py-6">
        {/* Desktop Search */}
        <div className="hidden sm:flex items-center gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-6 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            className="px-6 py-3 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
            onClick={handleSearch}
          >
            SEARCH
          </button>
          <button
            className="px-6 py-3 border border-gray-300 text-gray-700 text-sm tracking-wide hover:border-gray-900 hover:text-gray-900 transition-colors"
            onClick={() => setShowSearch(false)}
          >
            CLOSE
          </button>
        </div>

        {/* Mobile Search */}
        <div className="flex sm:hidden items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="search"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          <button
            className="px-5 py-3 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
            onClick={handleSearch}
          >
            GO
          </button>
          <button
            className="p-3 text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => setShowSearch(false)}
            aria-label="Close search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default SearchBar;