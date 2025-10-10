import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden fixed top-20 left-4 z-50 p-2.5 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 transition-all'
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Always visible on desktop, toggle on mobile */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-40
        w-[280px] md:w-[250px] lg:w-[18%] 
        min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 
        border-r border-gray-200 shadow-sm
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className='px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-200'>
          <h2 className='text-lg sm:text-xl font-bold text-gray-800'>Admin Panel</h2>
          <p className='text-xs sm:text-sm text-gray-500 mt-1'>Manage your store</p>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-col gap-2 pt-6 px-3 sm:px-4'>
          <NavLink
            to="/add"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-800 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`
            }
          >
            <img className='w-5 h-5 flex-shrink-0' src={assets.add_icon} alt="" />
            <p className='font-medium text-sm sm:text-base'>Add New Item</p>
          </NavLink>

          <NavLink
            to="/list"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-800 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`
            }
          >
            <img className='w-5 h-5 flex-shrink-0' src={assets.order_icon} alt="" />
            <p className='font-medium text-sm sm:text-base'>List Items</p>
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-800 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
              }`
            }
          >
            <img className='w-5 h-5 flex-shrink-0' src={assets.order_icon} alt="" />
            <p className='font-medium text-sm sm:text-base'>Manage Orders</p>
          </NavLink>
        </div>

        {/* Footer Section */}
        <div className='absolute bottom-6 sm:bottom-8 left-3 right-3 sm:left-4 sm:right-4 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg shadow-sm border border-gray-200'>
          <p className='text-xs text-gray-600 text-center'>Admin Dashboard v1.0</p>
        </div>
      </div>
    </>
  )
}

export default Sidebar