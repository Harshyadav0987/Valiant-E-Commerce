import React, { useCallback, useContext } from 'react'
import { ValiantContext } from '../context/ValiantContext'

function CartTotal() {
    const {currency,getCartAmount,navigate} = useContext(ValiantContext);
  return (
    <div>
      <div className='lg:col-span-1'>
                        <div className='bg-gray-50 rounded-lg p-6 sticky top-6'>
                            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Order Summary</h2>
                            
                            <div className='space-y-3 mb-6'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Subtotal</span>
                                    <span className='font-medium'>{currency}{getCartAmount().toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Shipping</span>
                                    <span className='font-medium'>{currency}10.00</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Tax</span>
                                    <span className='font-medium'>{currency}{(getCartAmount() * 0.1).toFixed(2)}</span>
                                </div>
                                <hr className='my-3' />
                                <div className='flex justify-between text-lg font-semibold'>
                                    <span>Total</span>
                                    <span>{currency}{(getCartAmount() + 10 + (getCartAmount() * 0.1)).toFixed(2)}</span>
                                </div>
                            </div>

                           

                            {/* Checkout Button */}
                      
                        </div>
                    </div>
    </div>
  )
}

export default CartTotal
