import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ValiantContext } from '../context/ValiantContext';

function Product() {
    const {ProductId} =useParams();
    const {products} =useContext(ValiantContext);
    const [productData,setProductData]= useState([]);
    const [image,setImage] =useState('');

    const fetchProductData = async()=>{

        products.map((item)=>{
            
        })
    }

  return (
    <div>
      
    </div>
  )
}

export default Product
