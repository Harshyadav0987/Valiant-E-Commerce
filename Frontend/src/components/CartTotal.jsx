// import React, { useCallback, useContext } from 'react'
// import { ValiantContext } from '../context/ValiantContext'

// function CartTotal() {
//     const {currency,getCartAmount,deliveryFee} = useContext(ValiantContext);
//   return (
//     <div>
//       <div className='lg:col-span-1'>
//                         <div className='bg-gray-50 rounded-lg p-6 sticky top-6'>
//                             <h2 className='text-lg font-semibold text-gray-900 mb-4'>Order Summary</h2>
                            
//                             <div className='space-y-3 mb-6'>
//                                 <div className='flex justify-between'>
//                                     <span className='text-gray-600'>Subtotal</span>
//                                     <span className='font-medium'>{currency}{getCartAmount().toFixed(2)}</span>
//                                 </div>
//                                 <div className='flex justify-between'>
//                                     <span className='text-gray-600'>Shipping</span>
//                                     <span className='font-medium'>{currency}{deliveryFee}</span>
//                                 </div>
//                                 <div className='flex justify-between'>
//                                     <span className='text-gray-600'>Tax</span>
//                                     <span className='font-medium'>{currency}{(getCartAmount() * 0.1).toFixed(2)}</span>
//                                 </div>
//                                 <hr className='my-3' />
//                                 <div className='flex justify-between text-lg font-semibold'>
//                                     <span>Total</span>
//                                     <span>{currency}{(getCartAmount() + 99 + (getCartAmount() * 0.1)).toFixed(2)}</span>
//                                 </div>
//                             </div>

                           

//                             {/* Checkout Button */}
                      
//                         </div>
//                     </div>
//     </div>
//   )
// }

// export default CartTotal


import React, { useContext, useEffect, useState } from 'react'
import { ShoppingBag, X, Minus, Plus, Lock, RefreshCw, Truck, Award } from 'lucide-react'
import { ValiantContext } from '../context/ValiantContext'



function CartTotal() {
  const { currency, getCartAmount, deliveryFee ,navigate} = useContext(ValiantContext)
  
  return (
   <div>
    <div className='bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden sticky top-6'>
      <div className='bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-5'>
        <h2 className='text-xl font-light text-white tracking-wide'>Order Summary</h2>
      </div>
      
      <div className='p-6 space-y-4'>
        <div className='space-y-3'>
          <div className='flex justify-between items-center group'>
            <span className='text-gray-500 text-sm font-light tracking-wide'>Subtotal</span>
            <span className='font-medium text-gray-900 transition-transform group-hover:scale-105'>
              {currency}{getCartAmount().toFixed(2)}
            </span>
          </div>
          
          <div className='flex justify-between items-center group'>
            <div className='flex items-center gap-2'>
              <Truck className='w-4 h-4 text-gray-400' />
              <span className='text-gray-500 text-sm font-light tracking-wide'>Shipping</span>
            </div>
            <span className='font-medium text-gray-900 transition-transform group-hover:scale-105'>
              {currency}{deliveryFee}
            </span>
          </div>
          
          <div className='flex justify-between items-center group'>
            <span className='text-gray-500 text-sm font-light tracking-wide'>Tax</span>
            <span className='font-medium text-gray-900 transition-transform group-hover:scale-105'>
              {currency}{(getCartAmount() * 0.1).toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className='border-t border-gray-200 pt-4'>
          <div className='flex justify-between items-center'>
            <span className='text-lg font-medium text-gray-900 tracking-wide'>Total</span>
            <span className='text-2xl font-semibold text-gray-900'>
              {currency}{(getCartAmount() + deliveryFee + (getCartAmount() * 0.1)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

export default CartTotal;
