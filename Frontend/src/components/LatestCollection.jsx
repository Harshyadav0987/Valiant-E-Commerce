import {React,useContext, useEffect, useState} from 'react'
import { ValiantContext } from '../context/ValiantContext'
import Title from './Title';
import ProductItem from './ProductItem';



function LatestCollection() {
  const {products}=useContext(ValiantContext);
  const [LatestProducts,setLatestProducts]=useState([]);

  useEffect(()=>{
    setLatestProducts(products.slice(0,10));
  },[])
  
  return (
    <div className='my-10'> 
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800'>Discover fashion made for every moment. Our latest arrivals feature a mix of everyday pieces and standout designs that redefine comfort, quality, and modern elegance.</p>
      </div>

      {/* // displaying products */}

      <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> 
        {
          LatestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/> 
          ))
        }
      </div>

    </div>

  )
}

export default LatestCollection;