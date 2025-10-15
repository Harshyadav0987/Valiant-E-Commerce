import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const {backendUrl, token, currency,deliveryFee} = useContext(ValiantContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try{
      if(!token){
        return null
      }
      const response = await axios.get(backendUrl + '/api/order/userorders', {headers: {token}})
      // console.log(headers);
      if(response.data.success){
        let allOrderItems = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
      }
    }
    catch(error){
      console.error('Error loading orders:', error)
    }
  }

  useEffect(()=>{
    loadOrderData()
  }, [token])

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('delivered')) return 'bg-green-500';
    if (statusLower.includes('shipped') || statusLower.includes('transit')) return 'bg-blue-500';
    if (statusLower.includes('processing') || statusLower.includes('pending')) return 'bg-yellow-500';
    if (statusLower.includes('cancelled')) return 'bg-red-500';
    return 'bg-gray-500';
  }

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  // Group items by order (by date and payment info)
  const groupedOrders = orderData.reduce((acc, item) => {
    const orderKey = `${item.date}-${item.paymentMethod}`;
    if (!acc[orderKey]) {
      acc[orderKey] = {
        date: item.date,
        paymentMethod: item.paymentMethod,
        payment: item.payment,
        status: item.status,
        items: []
      };
    }
    acc[orderKey].items.push(item);
    return acc;
  }, {});

  const orders = Object.values(groupedOrders);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* <div className='mb-8'>
          <Title text1={'MY'} text2={'ORDERS'}/>
          <p className='text-gray-600 mt-2'>Track and manage your orders</p>
        </div> */}

        {orders.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-sm p-12 text-center'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>No orders yet</h3>
            <p className='text-gray-500'>Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order, orderIndex) => (
              <div key={orderIndex} className='bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden'>
                {/* Order Header */}
                <div className='bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4'>
                  <div className='flex flex-wrap justify-between items-center gap-4'>
                    <div className='flex items-center gap-6 text-white'>
                      <div>
                        <p className='text-xs text-gray-300 uppercase tracking-wider mb-1'>Order Date</p>
                        <p className='font-semibold'>{new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                      <div className='h-12 w-px bg-gray-600'></div>
                      <div>
                        <p className='text-xs text-gray-300 uppercase tracking-wider mb-1'>Payment Method</p>
                        <p className='font-semibold'>{order.paymentMethod}</p>
                      </div>
                      <div className='h-12 w-px bg-gray-600'></div>
                      <div>
                        <p className='text-xs text-gray-300 uppercase tracking-wider mb-1'>Total Amount</p>
                        <p className='font-semibold text-lg'>
                          {currency + (calculateOrderTotal(order.items) * 1.1 + deliveryFee).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.status)} bg-opacity-20`}>
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></span>
                        <span className='text-sm font-medium text-gray-800'>{order.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className='divide-y divide-gray-100'>
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className='p-6 hover:bg-gray-50 transition-colors duration-200'>
                      <div className='flex flex-col md:flex-row gap-6'>
                        {/* Product Image */}
                        <div className='flex-shrink-0'>
                          <div className='w-28 h-28 rounded-xl overflow-hidden bg-gray-100 shadow-sm'>
                            <img 
                              className='w-full h-full object-cover' 
                              src={item.product?.images?.[0] || item.images?.[0]} 
                              alt={item.name}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                              }}
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className='flex-grow'>
                          <div className='flex justify-between items-start gap-4'>
                            <div>
                              <h3 className='text-lg font-semibold text-gray-900 mb-2'>{item.name}</h3>
                              <div className='flex flex-wrap gap-4 text-sm'>
                                <div className='flex items-center gap-2'>
                                  <span className='text-gray-500'>Price:</span>
                                  <span className='font-semibold text-gray-900'>{currency}{item.product.price}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <span className='text-gray-500'>Quantity:</span>
                                  <span className='font-semibold text-gray-900'>{item.quantity}</span>
                                </div>
                                {item.size && (
                                  <div className='flex items-center gap-2'>
                                    <span className='text-gray-500'>Size:</span>
                                    <span className='font-semibold text-gray-900'>{item.size}</span>
                                  </div>
                                )}
                              </div>
                              <div className='mt-3 inline-block'>
                                <div className='bg-gray-100 px-3 py-1 rounded-lg'>
                                  <span className='text-sm text-gray-600'>Subtotal: </span>
                                  <span className='text-sm font-bold text-gray-900'>{currency}{(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className='bg-gray-50 px-6 py-4 flex justify-between items-center'>
                  <div className='text-sm text-gray-600'>
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'} in this order
                  </div>
                  <button 
                    onClick={loadOrderData}
                    className='px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md'
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders;