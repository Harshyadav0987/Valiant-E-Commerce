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

                            {/* Promo Code */}
                            <div className='mb-6'>
                                <h3 className='text-sm font-medium text-gray-900 mb-2'>Promo Code</h3>
                                <div className='flex gap-2'>
                                    <input 
                                        type='text' 
                                        placeholder='Enter code' 
                                        className='flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                    />
                                    <button className='bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800'>
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button onClick={()=>navigate('/place-order')} className='w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors mb-4'>
                                PROCEED TO CHECKOUT
                            </button>

                            {/* Continue Shopping */}
                            <button onClick={()=>navigate('/collection')} className='w-full border border-gray-300 text-gray-700 py-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors'>
                                CONTINUE SHOPPING
                            </button>

                            {/* Security Icons */}
                            <div className='mt-6 pt-6 border-t border-gray-200'>
                                <div className='flex items-center gap-2 text-sm text-gray-500'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                                    </svg>
                                    <span>Secure checkout guaranteed</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-500 mt-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                    </svg>
                                    <span>Free returns within 30 days</span>
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
  )
}

export default CartTotal
