import React, { useContext } from 'react'
import { ValiantContext } from '../context/ValiantContext'

function SearchBar() {
    const {Search,setSearch,ShowSearch,setShowSearch} = useContext(ValiantContext);

  return ShowSearch? (
    <div className='border-t border-b bg-white  text-center flex items-center justify-center py-3'>
        {/* <div className="flex-1 justify-center mx-2 sm:flex hidden "> */}
            <div className="sm:flex items-center gap-2 w-full max-w-md hidden">
                <input
                    type="text"
                    className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full"
                    placeholder="Search..."
                    value={Search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <button className="bg-gray-800 text-white px-4 py-2 rounded  hover:bg-gray-100 hover:text-gray-800">
                    Search
                </button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-gray-800" onClick={()=>{setShowSearch(false)}}>
                    Close
                </button>
            </div>
        {/* </div>  */}

        <div className="flex-1 justify-center mx-2 flex mb-1 sm:hidden">
            <div className="flex items-center gap-2 w-70 max-w-md">
                <input
                    type="search"
                    className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full h-8"
                    placeholder="Search..."
                />
                <button className="bg-gray-800 text-white px-4 py-1 rounded h-8">
                    Search
                </button>
            </div>
        </div>

    </div>
  ):null;
}

export default SearchBar;
