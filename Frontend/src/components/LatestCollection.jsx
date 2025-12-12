// import {React,useContext, useEffect, useState} from 'react'
// import { ValiantContext } from '../context/ValiantContext'
// import Title from './Title';
// import ProductItem from './ProductItem';



// function LatestCollection() {
//   const {products}=useContext(ValiantContext);
//   const [LatestProducts,setLatestProducts]=useState([]);

//   useEffect(()=>{
//     setLatestProducts(products.slice(0,10));
//   },[products])
  
//   return (
//     <div className='my-0 '> 
//       <div className='text-center py-8 text-3xl'>
//         <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
//         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800'>Discover fashion made for every moment. Our latest arrivals feature a mix of everyday pieces and standout designs that redefine comfort, quality, and modern elegance.</p>
//       </div>

//       {/* // displaying products */}

//       <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> 
//                   {/* {console.log(LatestProducts)} */}

//         {
//           LatestProducts.map((item,index)=>(
//             <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/> 
//           ))
//         }
//       </div>

//     </div>

//   )
// }

// export default LatestCollection;

import {React,useContext, useEffect, useState} from 'react'
import { ValiantContext } from '../context/ValiantContext'
import Title from './Title';
import ProductItem from './ProductItem';


function LatestCollection() {
  const {products}=useContext(ValiantContext);
  const [LatestProducts,setLatestProducts]=useState([]);


if(!products || products.length === 0){ return <div>Loading...</div>;}

  useEffect(()=>{
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0,10));
    }
  },[products])
  
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-9 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gray-300" />
            <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">New In</span>
            <div className="h-px w-8 bg-gray-300" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900">
            Latest <span className="font-serif italic">Collections</span>
          </h2>
          
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Where sophistication meets everyday comfort. Each piece is thoughtfully designed to elevate your wardrobe with timeless appeal and modern refinement.
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12'> 
          {
            LatestProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/> 
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default LatestCollection;