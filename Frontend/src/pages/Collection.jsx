// import React, { useContext, useEffect, useState } from 'react'
// import { ValiantContext } from '../context/ValiantContext'
// import { assets } from '../assets/assets';
// import Title from "../components/Title"
// import ProductItem from "../components/ProductItem"

// function Collection() {
//     const {products,search,ShowSearch} = useContext(ValiantContext);
//     const [showFilter,setshowFilter] =useState(false);
//     const [filterProducts,setfilterProducts] = useState([]);
//     const [category,setCategory]=useState([]);
//     const [subCategory,setSubCategory] = useState([]);
//     const [sortType,setSortType] = useState('relevent');

//     const toggleCategory = (e)=>{

//         if(category.includes(e.target.value)){
//             setCategory(prev=> prev.filter(item => item !== e.target.value))
//         }
//         else{
//             setCategory(prev=>[...prev,e.target.value])
//         }

//     }
//     const toggleSubCategory = (e)=>{

//         if(subCategory.includes(e.target.value)){
//             setSubCategory(prev=> prev.filter(item => item !== e.target.value))
//         }
//         else{
//             setSubCategory(prev=>[...prev,e.target.value])
//         }
//     }

//     const applyFilter=()=>{
//         let productsCopy = products.slice();

//         if(ShowSearch && search){
//             productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
//         }

//         if(category.length>0){
//             productsCopy = productsCopy.filter(item=>category.includes(item.category));
//         }
//         if(subCategory.length>0){
//             productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory));
//         }

//         setfilterProducts(productsCopy);
//     }

//     const sortProduct=()=>{
//         let fpcopy = filterProducts.slice();

//         switch(sortType){
//             case 'low-high' :
//                 setfilterProducts(fpcopy.sort((a,b)=>(a.price - b.price)));
//                 break;

//             case 'high-low' :
//                 setfilterProducts(fpcopy.sort((a,b)=>(b.price - a.price)));
//                 break;

//             default :
//                 applyFilter();
//                 break;
//         }
//     }
//     useEffect(()=>{
//         applyFilter();
//     },[category,subCategory,search])

//     useEffect(()=>{
//         sortProduct();
//     },[sortType])

//   return (
//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t text-gray-800'>

//         {/* Filter Options */}

//         <div className='min-w-60'>
//             <p className='my-2 text-xl flex items-center gap-2 cursor-pointer' onClick={()=>setshowFilter(!showFilter)}>FILTERS
//                 <img className={`h-3 sm:hidden ${showFilter ? "rotate-90": " "} `} src={assets.dropdown_icon} alt="" />
//             </p>
//             <div className={`border border-gray-500 pl-3 py-5 mt-6 ${showFilter ? '' : 'hidden'} sm:flex flex-col`}>
//                 <p className='mb-3 text-sm font-medium uppercase'>Categories</p>
                
//                 <div className='flex flex-col gap-2 text-sm font-light text-gray-800'>
//                     <label className='flex gap-2 items-center'>
//                         <input className='w-3 cursor-pointer' type="checkbox" value="Men"  onChange={toggleCategory}/>
//                         Men
//                     </label>
//                     <label className='flex gap-2 items-center'>
//                         <input className='w-3 cursor-pointer' type="checkbox" value="Women" onChange={toggleCategory}/>
//                         Women
//                     </label>
//                     <label className='flex gap-2 items-center'>
//                         <input className='w-3 cursor-pointer' type="checkbox" value="Kids" onChange={toggleCategory}/>
//                         Kids
//                     </label>
//                 </div>
//             </div>

//         {/* Sub category Filter */}
        
//             <div className={`border border-gray-500 pl-3 py-5 my-5 ${showFilter ? '' : 'hidden'} sm:flex flex-col`}>
//                 <p className='mb-3 text-sm font-medium uppercase'>Type</p>
                
//                 <div className='flex flex-col gap-2 text-sm font-light text-gray-800'>
//                     <label className='flex gap-2 items-center'>
//                         <input className='w-3 cursor-pointer' type="checkbox" value="Topwear" onChange={toggleSubCategory}/>
//                         Topwear
//                     </label>

//                     <label className='flex gap-2 items-center'>
//                         <input className='w-3 cursor-pointer' type="checkbox" value="Bottomwear" onChange={toggleSubCategory}/>
//                         Bottomwear
//                     </label>

//                     <label className='flex gap-2 items-center'>
//                         <input className='w-3 cursor-pointer' type="checkbox" value="Winterwear" onChange={toggleSubCategory}/>
//                         Winterwear
//                     </label>
//                 </div>
//             </div>

//         </div>

//         {/* Right side */}

//         <div className='flex-1'>
//             <div className='flex justify-between text-base sm:text-2xl mb-4'>
//                 <Title text1={'ALL'} text2={'COLLECTIONS'}/>
//                 {/* Product sort */}
//                 <select className='border-2 border-gray-500 text-sm px-2' onChange={(e)=>setSortType(e.target.value)}>
//                     <option value="relevent">Sort by: Relevent</option>
//                     <option value="low-high">Sort by: Low to High</option>
//                     <option value="high-low">Sort by: High to Low</option>
//                 </select>

//                 {/* Map products */}

//             </div>
//             <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
//                 {
//                     filterProducts.map((item,index)=>(
//                         <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
//                     ))
//                 }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Collection



import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import { assets } from '../assets/assets';
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

function Collection() {
    const {products,search,ShowSearch} = useContext(ValiantContext);
    const [showFilter,setshowFilter] =useState(false);
    const [filterProducts,setfilterProducts] = useState([]);
    const [category,setCategory]=useState([]);
    const [subCategory,setSubCategory] = useState([]);
    const [sortType,setSortType] = useState('relevent');

    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev=>[...prev,e.target.value])
        }
    }
    
    const toggleSubCategory = (e)=>{
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else{
            setSubCategory(prev=>[...prev,e.target.value])
        }
    }

    const applyFilter=()=>{
        let productsCopy = products.slice();

        if(ShowSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if(category.length>0){
            productsCopy = productsCopy.filter(item=>category.includes(item.category));
        }
        if(subCategory.length>0){
            productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory));
        }

        setfilterProducts(productsCopy);
    }

    const sortProduct=()=>{
        let fpcopy = filterProducts.slice();

        switch(sortType){
            case 'low-high' :
                setfilterProducts(fpcopy.sort((a,b)=>(a.price - b.price)));
                break;

            case 'high-low' :
                setfilterProducts(fpcopy.sort((a,b)=>(b.price - a.price)));
                break;

            default :
                applyFilter();
                break;
        }
    }
    
    useEffect(()=>{
        applyFilter();
    },[category,subCategory,search])

    useEffect(()=>{
        sortProduct();
    },[sortType])

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        
        {/* Header Section */}
        <div className='mb-8 sm:mb-12'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <Title text1={'ALL'} text2={'COLLECTIONS'}/>
              <p className='text-gray-600 text-sm mt-2'>Discover our curated selection of premium products</p>
            </div>
            
            {/* Sort Dropdown - Desktop */}
            <div className='hidden sm:flex items-center gap-3'>
              <span className='text-sm text-gray-600 font-medium'>Sort by:</span>
              <select 
                className='bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all cursor-pointer shadow-sm hover:shadow-md'
                onChange={(e)=>setSortType(e.target.value)}
                value={sortType}
              >
                <option value="relevent">Relevance</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Toggle & Sort */}
          <div className='flex items-center gap-3 mt-6 sm:hidden'>
            <button 
              onClick={()=>setshowFilter(!showFilter)}
              className='flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-all shadow-sm'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
              </svg>
              Filters
              {(category.length + subCategory.length > 0) && (
                <span className='bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {category.length + subCategory.length}
                </span>
              )}
            </button>
            
            <select 
              className='flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all shadow-sm'
              onChange={(e)=>setSortType(e.target.value)}
              value={sortType}
            >
              <option value="relevent">Relevance</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          
          {/* Filters Sidebar */}
          <aside className={`lg:w-72 ${showFilter ? 'block' : 'hidden'} lg:block transition-all duration-300`}>
            <div className='lg:sticky lg:top-24 space-y-6'>
              
              {/* Categories Filter */}
              <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-b border-gray-200'>
                  <h3 className='text-sm font-semibold text-gray-800 uppercase tracking-wider'>Categories</h3>
                </div>
                <div className='p-5 space-y-3'>
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                      <div className='relative'>
                        <input 
                          className='peer w-5 h-5 cursor-pointer appearance-none border-2 border-gray-300 rounded checked:bg-gray-800 checked:border-gray-800 transition-all' 
                          type="checkbox" 
                          value={cat}
                          checked={category.includes(cat)}
                          onChange={toggleCategory}
                        />
                        <svg className='absolute top-0.5 left-0.5 w-4 h-4 text-white hidden peer-checked:block pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                      <span className='text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors'>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-b border-gray-200'>
                  <h3 className='text-sm font-semibold text-gray-800 uppercase tracking-wider'>Type</h3>
                </div>
                <div className='p-5 space-y-3'>
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                    <label key={type} className='flex items-center gap-3 cursor-pointer group'>
                      <div className='relative'>
                        <input 
                          className='peer w-5 h-5 cursor-pointer appearance-none border-2 border-gray-300 rounded checked:bg-gray-800 checked:border-gray-800 transition-all' 
                          type="checkbox" 
                          value={type}
                          checked={subCategory.includes(type)}
                          onChange={toggleSubCategory}
                        />
                        <svg className='absolute top-0.5 left-0.5 w-4 h-4 text-white hidden peer-checked:block pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                      <span className='text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors'>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(category.length > 0 || subCategory.length > 0) && (
                <div className='bg-gray-50 rounded-xl border border-gray-200 p-5'>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='text-sm font-semibold text-gray-800'>Active Filters</h3>
                    <button 
                      onClick={() => {
                        setCategory([]);
                        setSubCategory([]);
                      }}
                      className='text-xs text-gray-600 hover:text-gray-900 font-medium underline transition-colors'
                    >
                      Clear All
                    </button>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {[...category, ...subCategory].map((filter, idx) => (
                      <span key={idx} className='inline-flex items-center gap-1.5 bg-white border border-gray-300 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm'>
                        {filter}
                        <button 
                          onClick={() => {
                            if (category.includes(filter)) {
                              setCategory(prev => prev.filter(item => item !== filter));
                            } else {
                              setSubCategory(prev => prev.filter(item => item !== filter));
                            }
                          }}
                          className='hover:text-gray-900 transition-colors'
                        >
                          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <main className='flex-1'>
            {filterProducts.length > 0 ? (
              <>
                <div className='mb-4 text-sm text-gray-600'>
                  Showing <span className='font-semibold text-gray-800'>{filterProducts.length}</span> products
                </div>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                  {filterProducts.map((item,index)=>(
                    <div key={index} className='group'>
                      <ProductItem 
                        name={item.name} 
                        id={item._id} 
                        price={item.price} 
                        image={item.image}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center py-16 sm:py-24'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <svg className='w-8 h-8 sm:w-10 sm:h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                  </svg>
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>No products found</h3>
                <p className='text-sm text-gray-600 text-center max-w-sm'>Try adjusting your filters or search criteria to find what you're looking for.</p>
                {(category.length > 0 || subCategory.length > 0) && (
                  <button 
                    onClick={() => {
                      setCategory([]);
                      setSubCategory([]);
                    }}
                    className='mt-6 bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors shadow-md'
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Collection