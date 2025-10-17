// import React, { useContext, useEffect, useState } from 'react'
// import { ValiantContext } from '../context/ValiantContext'
// import Title from './Title'
// import ProductItem from './ProductItem';
// import { ShoppingBag, ArrowRight, Package, Shield, Headphones } from 'lucide-react';


// function BestSeller() {
//     const {products} = useContext(ValiantContext);
//     const [BestProducts,setBestProducts] = useState([]);


//     useEffect(()=>{
//         const bestProducts = products.filter((item)=>(item.bestseller));
//         setBestProducts(bestProducts.slice(0,5));
//     },[products])
    
//     // console.log(BestProducts)

//     return (
//         <div className='my-0 '> 
//             <div className='text-center py-8 text-3xl'>
//                 <Title text1={"BEST"} text2={"SELLERS"}/>
//                 <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800'>Tried, tested, and loved — our best sellers represent the perfect blend of trend and trust. Explore what makes them everyone’s go-to picks.</p>
//             </div>

//             {/* // displaying products */}

//             <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> 
                
//                 {
//                 BestProducts.map((item,index)=>(
//                     <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/> 
//                 ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default BestSeller;
import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import Title from './Title'
import ProductItem from './ProductItem';

function BestSeller() {
    const {products} = useContext(ValiantContext);
    const [BestProducts,setBestProducts] = useState([]);

    useEffect(()=>{
        if (products && products.length > 0) {
          const bestProducts = products.filter((item)=>(item.bestseller));
          setBestProducts(bestProducts.slice(0,5));
        }
    },[products.length])
    
    return (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-9 space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gray-300" />
                <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">Customer Favorites</span>
                <div className="h-px w-8 bg-gray-300" />
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900">
                Best <span className="font-serif italic">Sellers</span>
              </h2>
              
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Our most-loved pieces, chosen by you. Discover why these styles have captured hearts and become wardrobe essentials.
              </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12'> 
                {
                BestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/> 
                ))
                }
            </div>
          </div>
        </section>
    )
}

export default BestSeller;