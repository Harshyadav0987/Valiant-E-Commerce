import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import Title from '../components/Title';

const Orders = () => {
  const [orders] = useState([
    {
      id: 1,
      name: "Men Round Neck Pure Cotton T-shirt",
      price: 200,
      quantity: 1,
      size: "M",
      date: "25 Jul, 2024",
      status: "ready",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Girls Round Neck Cotton Top",
      price: 220,
      quantity: 1,
      size: "M",
      date: "25 Jul, 2024",
      status: "ready",
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Women's Casual Denim Jacket",
      price: 350,
      quantity: 1,
      size: "L",
      date: "20 Jul, 2024",
      status: "shipped",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "Classic White Sneakers",
      price: 180,
      quantity: 1,
      size: "9",
      date: "18 Jul, 2024",
      status: "delivered",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getStatusInfo = (status) => {
    switch (status) {
      case 'ready':
        return { text: 'Ready to ship', color: 'text-green-600', bgColor: 'bg-green-50', icon: Package };
      case 'shipped':
        return { text: 'Shipped', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Truck };
      case 'delivered':
        return { text: 'Delivered', color: 'text-gray-600', bgColor: 'bg-gray-50', icon: CheckCircle };
      default:
        return { text: 'Processing', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: Clock };
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 text-3xl font-bold text-gray-900">
            <Title text1={'MY'} text2={'ORDERS'}/>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilter('ready')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'ready' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Ready to Ship
            </button>
            <button
              onClick={() => setFilter('shipped')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'shipped' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Shipped
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'delivered' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Delivered
            </button>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-lg object-cover"
                        src={order.image}
                        alt={order.name}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {order.name}
                      </h3>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span className="font-medium text-xl text-gray-900">
                          ${order.price}
                        </span>
                        <span>Quantity: {order.quantity}</span>
                        <span>Size: {order.size}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Date: {order.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {statusInfo.text}
                      </div>
                    </div>
                    
                    <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">No orders match your current filter.</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="w-8 h-8 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ready to Ship</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(o => o.status === 'ready').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Shipped</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;