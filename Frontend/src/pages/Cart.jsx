import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { faMinus,faP,faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartTotal from '../components/CartTotal'

function Cart() {
    const { products, currency, cartItems, updateQuantity,getCartAmount,navigate } = useContext(ValiantContext)
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const tempData = []
            for (const items in cartItems) {
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
            setCartData(tempData)
        }
    }, [cartItems, products])

    // Calculate total price
    // const getCartAmount = () => {
    //     let totalAmount = 0
    //     for (const item of cartData) {
    //         const itemInfo = products.find((product) => product._id === item._id)
    //         if (itemInfo) {
    //             totalAmount += itemInfo.price * item.quantity
    //         }
    //     }
    //     return totalAmount
    // }

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'}/>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Cart Items Section */}
                <div className='lg:col-span-2'>
                    {cartData.length === 0 ? (
                        <div className='text-center py-16'>
                            <div className='text-gray-400 mb-4'>
                                <svg className='w-20 h-20 mx-auto mb-4' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6V5a2 2 0 114 0v1H8zm2 6a1 1 0 100-2 1 1 0 000 2z' clipRule='evenodd' />
                                </svg>
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
                                                    src={productData.image[0]} 
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
                                                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                                            <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                                                        </svg>
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
                                                        />                                                        <button 
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
                    <CartTotal/>
                )}
            </div>
        </div>
    )
}

export default Cart