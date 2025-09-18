import React, { useContext } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import { Link } from 'react-router-dom'

function ProductItem({id,image,name,price}) {
    const {currency} = useContext(ValiantContext);
  return (
    <Link className='text-gray-800 cursor-pointer' to={`/product/${id}`}>
          <div className="overflow-hidden">
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
          </div>
    </Link>
  )
}

export default ProductItem
