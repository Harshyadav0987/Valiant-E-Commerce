import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import Title from './Title'
import ProductItem from './ProductItem';

function BestSeller() {
    const {products} = useContext(ValiantContext);
    const [BestProducts,setBestProducts] = useState([]);


    useEffect(()=>{
        const bestProducts = products.filter((item)=>(item.bestseller));
        setBestProducts(bestProducts.slice(0,5));
    },[products])
    
    // console.log(BestProducts)

    return (
        <div className='my-0 '> 
            <div className='text-center py-8 text-3xl'>
                <Title text1={"BEST"} text2={"SELLERS"}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800'>Tried, tested, and loved — our best sellers represent the perfect blend of trend and trust. Explore what makes them everyone’s go-to picks.</p>
            </div>

            {/* // displaying products */}

            <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> 
                
                {
                BestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/> 
                ))
                }
            </div>
        </div>
    )
}

export default BestSeller;
