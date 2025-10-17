import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';
import { Package, MapPin, Calendar, CreditCard, Phone, User } from 'lucide-react';

const Orders = ({ token ,toast}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
        const ord = ((response.data.orders).reverse())
        setOrders(ord);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.log("error");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/updatestatus`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order status updated');
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Order Placed': 'bg-blue-100 text-blue-800 border-blue-200',
      'Packing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'Out for delivery': 'bg-orange-100 text-orange-800 border-orange-200',
      'Delivered': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
          <p className="text-gray-600">Track and manage all customer orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Order Icon & Items */}
                    <div className="lg:col-span-5">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                            <img className="w-8 h-8" src={assets.parcel_icon} alt="Parcel" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-3">
                            {order.items.map((item, idx) => (
                              <p className="text-sm text-gray-700 py-0.5" key={idx}>
                                <span className="font-medium">{item.product.name}</span>
                                <span className="text-gray-500"> × {item.quantity}</span>
                                {item.size && <span className="text-gray-500"> ({item.size})</span>}
                                {idx !== order.items.length - 1 && <span className="text-gray-400">, </span>}
                              </p>
                            ))}
                          </div>
                          
                          {/* Customer Info */}
                          <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-900">
                                {order.address.firstName + ' ' + order.address.lastName}
                              </span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p>{order.address.street}</p>
                                <p>
                                  {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{order.address.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="lg:col-span-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Items:</span>
                        <span className="font-medium text-gray-900">{order.items.length}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Method:</span>
                        <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Payment:</span>
                        <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>
                          {order.payment ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="text-sm text-gray-600">Total Amount</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          {currency}{order.amount}
                        </div>
                      </div>
                    </div>

                    {/* Status Selector */}
                    <div className="lg:col-span-3 flex flex-col justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Order Status
                        </label>
                        <select
                          onChange={(event) => statusHandler(event, order._id)}
                          value={order.status}
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;