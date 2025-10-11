// import React, { useContext } from 'react'
// import { ValiantContext } from '../context/ValiantContext'
// import { Link } from 'react-router-dom'

// function ProductItem({id,image,name,price}) {
//     const {currency} = useContext(ValiantContext);
//   return (
//     <Link className='text-gray-800 cursor-pointer' to={`/product/${id}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
//           <div className="overflow-hidden">
//             <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
//             <p className='pt-3 pb-1 text-sm'>{name}</p>
//             <p className='text-sm font-medium'>{currency}{price}</p>
//           </div>
//     </Link>
//   )
// }

// export default ProductItem


import React, { useContext } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import { Link } from 'react-router-dom'

function ProductItem({id,image,name,price}) {
    const {currency} = useContext(ValiantContext);
  return (
    <Link 
      className='group block' 
      to={`/product/${id}`} 
      onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
    >
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 ease-out">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img 
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' 
            src={image[0]} 
            alt={name} 
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Quick View Badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-xs font-semibold shadow-lg border border-gray-200">
              View Details
            </span>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className='text-gray-800 font-medium text-sm leading-snug group-hover:text-gray-900 transition-colors line-clamp-2 min-h-[2.5rem]'>
            {name}
          </h3>
          
          <div className="flex items-center justify-between pt-1">
            <p className='text-gray-800 font-bold text-base'>
              {currency}{price}
            </p>
            
            {/* Arrow Icon */}
            <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-gray-800 flex items-center justify-center transition-all duration-300">
              <svg 
                className='w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem