import React from 'react'
import {assets} from "../assets/assets.js"

function Navbar() {
  return (
    <div className='flex items-center justify-between py-4 px-8 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm'>
      {/* Logo Section */}
      <div className='flex items-center gap-3'>
        <img className='w-[max(20%,80px)] transition-transform hover:scale-105' src={assets.admin_final} alt="Admin Logo" />
        <div className='hidden sm:block'>
          <h1 className='text-lg font-bold text-gray-800'>Admin Dashboard</h1>
          <p className='text-xs text-gray-500'>Welcome back!</p>
        </div>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {/* User Info (Optional) */}
        <div className='hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100'>
          <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-bold'>H</span>
          </div>
          <div>
            <p className='text-sm font-medium text-gray-800'>Harsh</p>
            <p className='text-xs text-gray-500'>Harsh@Valiant.com</p>
          </div>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar