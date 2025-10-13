import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import Title from '../components/Title'
import { faMinus,faP,faPlus,faXmark ,faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartTotal from '../components/CartTotal'

function Cart() {
    const { products, currency, cartItems, updateQuantity,navigate } = useContext(ValiantContext)
    const [cartData, setCartData] = useState([])
    useEffect(() => {
        if (products.length > 0) {
            const tempData = []
            for (const items in cartItems) {
                // Check if it has the 'sizes' property (backend structure)
                if (cartItems[items].sizes) {
                    for (const size in cartItems[items].sizes) {
                        if (cartItems[items].sizes[size] > 0) {
                            tempData.push({
                                _id: items,
                                size: size,
                                quantity: cartItems[items].sizes[size]
                            })
                        }
                    }
                } else {
                    // Fallback for direct structure
                    for (const item in cartItems[items]) {
                        if (cartItems[items][item] > 0) {
                            tempData.push({
                                _id: items,
                                size: item,
                                quantity: cartItems[items][item]
                            })
                        }
                    }
                }
            }
            setCartData(tempData)
        }
    }, [cartItems, products])

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'}/>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Cart Items Section */}
                <div className='lg:col-span-2'>
                    {cartData.length === 0 ? (
                        <div className='text-center py-16 ml-96 pl-16'>
                            <div className='text-gray-400 mb-4'>
                                <FontAwesomeIcon className='size-20' icon={faShoppingBag}/>
                            </div>
                            <h3 className='text-xl font-medium text-gray-900 mb-2'>Your cart is empty</h3>
                            <p className='text-gray-500 mb-6'>Add some products to get started</p>
                            <button onClick={()=>navigate('/collection')} className='bg-black text-white px-6 py-3 text-sm hover:bg-gray-800'>
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {cartData.map((item, index) => {
                                const productData = products.find((product) => product._id === item._id)
                                return (
                                    <div key={index} className='bg-white border rounded-lg p-6 shadow-sm'>
                                        <div className='flex flex-col sm:flex-row gap-4'>
                                            {/* Product Image */}
                                            <div className='w-full sm:w-24 h-32 sm:h-24 flex-shrink-0'>
                                                <img 
                                                    className='w-full h-full object-cover rounded-lg' 
                                                    src={productData.images[0]} 
                                                    alt={productData.name}
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className='flex-1 space-y-2'>
                                                <div className='flex justify-between items-start'>
                                                    <div>
                                                        <h3 className='font-medium text-gray-900'>{productData.name}</h3>
                                                        <p className='text-sm text-gray-500'>Size: {item.size}</p>
                                                        <p className='text-lg font-semibold text-gray-900 mt-1'>
                                                            {currency}{productData.price}
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Remove Button */}
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, item.size, 0)}
                                                        className='text-gray-400 hover:text-red-500 p-1'
                                                    >
                                                       <FontAwesomeIcon icon={faXmark}/>
                                                    </button>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className='flex items-center justify-between mt-4 text-gray-900'>
                                                    <div className='flex items-center border rounded-lg'>
                                                        <button 
                                                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                                                            className='p-2 hover:bg-gray-100 text-gray-600 border-gray-500'
                                                        >
                                                            <FontAwesomeIcon icon={faMinus}/>
                                                        </button>

                                                        <input 
                                                        className='w-8 text-center' 
                                                        type="text" 
                                                        value={item.quantity} 
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            
                                                            // Allow empty input (user is typing/clearing)
                                                            if (value === '') {
                                                            updateQuantity(item._id, item.size, 0);
                                                            return;
                                                            }
                                                            
                                                            // Convert to number and validate
                                                            const numValue = Number(value);
                                                            
                                                            // Only update if it's a valid positive number
                                                            if (!isNaN(numValue) && numValue >= 0) {
                                                            updateQuantity(item._id, item.size, numValue);
                                                            }
                                                        }} 
                                                        />                                                        
                                                        <button 
                                                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                                                            className='p-2 hover:bg-gray-100 text-gray-600'
                                                        >
                                                            <FontAwesomeIcon icon={faPlus}/>
                                                        </button>
                                                    </div>

                                                    {/* Item Subtotal */}
                                                    <div className='text-lg font-semibold text-gray-900'>
                                                        {currency}{(productData.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            })}

                           
                        </div>
                        
                    )}
                </div>

                {/* Order Summary Section */}
                {cartData.length > 0 && (
                    <div>
                        <CartTotal/>
                        <div>
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
                )}
            </div>
        </div>
    )
}

export default Cart